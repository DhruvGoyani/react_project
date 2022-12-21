import * as ActionTypes from "../ActionTypes"
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import {db, storage} from "../../Firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const GetCategorydata = () => async(dispatch) => {
    
    try {
        const querySnapshot = await getDocs(collection(db, "category"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });
        dispatch({ type: ActionTypes.GETCATEGORY, payload: data })
    } catch (error) {
        console.info("error++ ",error)
        dispatch(ErrorCategory(error.message));
    }
}

export const AddCategory = (data) => async (dispatch) => {
    console.log(data);
    try {
        let Filename = Math.floor(Math.random() * 100000000).toString();

        const docRef = ref(storage, 'category/' + Filename)
        uploadBytes(docRef, data.category_img)
            .then(async (snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "category"), { ...data, category_img: url, Filename: Filename });
                        dispatch({ type: ActionTypes.ADDCATEGORY, payload: { id: docRef.id, ...data, category_img: url, Filename: Filename } })
                    });
            });
    } catch (error) {
        dispatch(ErrorCategory(error.message));
    }
}

export const DeleteCategory = (data) => async (dispatch) => {
    console.log(data.id , data.Filename);
    try {
        const docRef = ref(storage, 'category/' + data.Filename);
        deleteObject(docRef).then(async () => {
            await deleteDoc(doc(db, "category", data.id));
            dispatch({ type: ActionTypes.DELETECATEGORY, payload: data.id })
        }).catch((error) => {
            dispatch(ErrorCategory(error.message));
        });
    } catch (error) {
        dispatch(ErrorCategory(error.message));
    }
}


export const UpdateCategory = (data) => async(dispatch) => {
    console.log(data);
    try {
        const docRef = doc(db, "category", data.id);

        if (typeof data.category_img === "string") {
            await updateDoc(docRef, {
                categoryname: data.categoryname,
                price : data.price,
                quantity : data.quantity,
                category_img: data.category_img,
                Filename: data.Filename
            });
            dispatch({ type: ActionTypes.UPDATECATEGORY, payload: data })
        } else {
            //1
            let Filename = Math.floor(Math.random() * 100000000).toString();
            const docRefDel = ref(storage, 'category/' + data.Filename);
            const docRefIns = ref(storage, 'category/' + Filename)

            deleteObject(docRefDel)
                .then(async () => {
                    uploadBytes(docRefIns, data.category_img)
                        .then(async (snapshot) => {
                            getDownloadURL(snapshot.ref)
                                .then(async (url) => {

                                    await updateDoc(docRef, {
                                        categoryname: data.categoryname,
                                        price : data.price,
                                        quantity: data.quantity,
                                        category_img: url,
                                        Filename: Filename
                                    });
                                    dispatch({ type: ActionTypes.UPDATECATEGORY, payload: { ...data, category_img: url, Filename: Filename } })
                                })
                        })
                })

        }


    } catch (error) {
        dispatch(ErrorCategory(error.message));
    }
}

  export const ErrorCategory = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERRORCATEGORY, payload: error })
  }