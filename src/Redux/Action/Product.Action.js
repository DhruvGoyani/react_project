import * as ActionTypes from "../ActionTypes";
import { db, storage } from "../../Firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Productdata = (data) => async (dispatch) => {
  // console.log(data);
  try {
    let data = []
    const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() })
      dispatch({ type: ActionTypes.GET_PRODUCT, payload: data })
      // console.log(`${doc.id} => ${doc.data()}`);
    });

  } catch (error) {
    dispatch(errorProduct(error.message))
    console.log(error.message);
  }
}

export const addProduct = (data) => (dispatch) => {
  console.log(data);
  try {

    //  const docRef = await addDoc(collection(db, " doctors"),{id:docRef.id, ...data});
    const rendomName = Math.floor(Math.random() * 10000000).toString();
    console.log(rendomName);
    const productsRef = ref(storage, 'products/' + rendomName);

    uploadBytes(productsRef, data.file)
      .then((snapshot) => {
        // console.log('Uploaded a blob or file!');
        getDownloadURL(snapshot.ref)
          .then(async (url) => {
            const docRef = await addDoc(collection(db, "products"), {
              name: data.name,
              price: data.price,
              categoryname: data.categoryname,
              url: url,
              FileName: rendomName
            });
            dispatch({
              type: ActionTypes.ADD_PRODUCT, payload: {
                id: docRef.id,
                name: data.name,
                price: data.price,
                categoryname: data.categoryname,
                url: url,
                FileName: rendomName
              }
            })
          })
      });

  } catch (error) {
    dispatch(errorProduct(error.message));
    // console.error("Error adding document: ", error);
  }
}


export const deleteproduct = (data) => async (dispatch) => {
  console.log(data);
  try {
    const productsRef = ref(storage, 'products/' + data.FileName);
    // console.log(productsRef);
    deleteObject(productsRef).then(async () => {
      await deleteDoc(doc(db, "products", data.id));
      dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: data.id })
    }).catch((error) => {
      dispatch(errorProduct(error.message))
    });
  }
  catch (error) {
    dispatch(errorProduct(error.message))
  }
}

export const editproduct = (data) => async (dispatch) => {
  console.log(data);
  
  try {
    const productsRef = doc(db, "products", data.id);
    if (typeof data.file === "string") { 
      console.log("only data");
      await updateDoc(productsRef, {
        name: data.name,
        price: data.price,
        categoryname: data.categoryname,
        url: data.url
      });
      dispatch({ type: ActionTypes.UPDATECATEGORY, payload: data })
    } else {
      console.log("error");
      const Productdel = ref(storage, 'products/' + data.FileName);

      deleteObject(Productdel).then(async () => {
        let image = Math.floor(Math.random() * 1000000).toString();
        const productRef = ref(storage, 'products/' + image)

        uploadBytes(productRef, data.file)
          .then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then(async (url) => {
                await updateDoc(productsRef,{
                  name: data.name,
                  price: data.price,
                  categoryname: data.categoryname,
                  url: url,
                  FileName: image
                });
                dispatch({
                  type: ActionTypes.EDIT_PRODUCT, payload:{
                    ...data,
                     url:url,
                    FileName: image,
                  }
                })
              })
          })
      })
    }
  } catch (error) {
    dispatch(errorProduct(error.message))
  }
}


export const errorProduct = (error) => (dispatch) => {
  dispatch({ type: ActionTypes.ERROR_PRODUCT, payload: error })
}