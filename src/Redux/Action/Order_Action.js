import { db} from "../../../Firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import * as ActionTypes from "../ActionType"


export const getorder = () => async (dispatch) => {

    try {
        let data = []

        const querySnapshot = await getDocs(collection(db, "order"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        })

        dispatch({ type: ActionTypes.GET_ORDER, payload: data })

    } catch (error) {
        dispatch(errororder(error))
        // console.log(error);
    }
}

export const addorder = (OrderData) => async (dispatch) => {
    // console.log(OrderData);
    try {
        const ordersRef = await addDoc(collection(db, "order"), OrderData)
        dispatch({ type: ActionTypes.ADD_ORDER, payload: ordersRef })

    } catch (error) {
        dispatch(errororder(error.message))
        // console.error("Error adding document: ", error);
    }
}

export const errororder = (error) => (dispatch) => {
    dispatch({ type: ActionTypes.ERROR_ORDER, payload: error })
}
