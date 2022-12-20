import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { useFormik, Form, Formik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AddCategory, DeleteCategory, GetCategory, GetCategorydata, UpdateCategory } from "../../Redux/Action/Category.Action";
import { ADDCATEGORY } from "../../Redux/ActionTypes";
import { CategoryReducer } from "../../Redux/Reducer/Category_Reducer";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import ModeIcon from '@mui/icons-material/Mode';

function Category(props) {
  const [open, setOpen] = React.useState(false);
  const [dopen, setDOpen] = useState(false);
  const [data, setData] = useState([]);
  const [did , setDid] = useState(0);
  const [filterdata, setFilterData] = useState([]);
  const [update , setUpdate] = useState(false);

  const dispatch = useDispatch();
  const Category = useSelector(state => state.category);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDClickOpen = () => {
    setDOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDOpen(false);  
  };

  const handleSearch = (val) => {
    let localData = JSON.parse(localStorage.getItem("category"));
    let FData = localData.filter(
      (l) =>
        l.name.toLowerCase().includes(val.toLowerCase()) 
    );
    setFilterData(FData);
  };

  const finalData = filterdata.length > 0 ? filterdata : data;

  const handleInsert = (values) => {

    dispatch(AddCategory(values));
    handleClose();
    loadData();
    formikobject.resetForm();

  };

  const handleDelete = (params) => {
      console.log(params);
      dispatch(DeleteCategory(did));
      handleClose();
      loadData();
      

  };

  const handleUpdate = (values) => {
    console.log(values);
    dispatch(UpdateCategory(values));
    loadData();
    handleClose();
    formikobject.resetForm();
  }

  const handleEdit = (params) => {
    handleClickOpen();
    setUpdate(true);
    formikobject.setValues(params)
  }

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "price", width: 130 },
    { field: "quantity", headerName: "quantity", width: 130 },
    {
      field: 'category_img',
      headerName: 'Category_Image',
      width: 130,
      renderCell: (params) => (
          <img src={params.row.category_img} width={50} height={50} alt='' />
      )
  },
  {

    field: 'Delete', headerName: 'Delete', width: 130, renderCell: (params) => (
        <>
            <IconButton aria-label="delete" size="large" onClick={() => { handleDClickOpen(); setDid(params.row) }}>
                <DeleteIcon />
            </IconButton>
        </>
    )},
    {

      field: 'update', headerName: 'update', width: 130, renderCell: (params) => (
          <>
              <IconButton aria-label="update" size="large" onClick={() => { handleEdit(params.row) }}>
                  <ModeIcon />
              </IconButton>
          </>
      )}
  ];

  let schema = yup.object().shape({
    name: yup.string().required(" please enter category name"),
    price: yup.number().required("please enter price").positive(),
    quantity: yup.number().required("please enter quantity"),
    category_img : yup.mixed().required()
  });

  const formikobject = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
      category_img: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (update) {
        handleUpdate(values);
      } else {
        handleInsert(values);
      }

    },
  });

  const loadData = () => {
    let localData = JSON.parse(localStorage.getItem("category"));

    if (localData !== null) {
      setData(localData);
    }
  };

  useEffect(() => {
    // loadData();
    dispatch(GetCategorydata());
  }, []);

  const { handleSubmit, values, handleChange, handleBlur, errors, touched , setFieldValue } =
    formikobject;
        
  return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Category
        </Button>

        <TextField
          autoFocus
          margin="dense"
          id="search"
          label="category search"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={Category.category}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>

        <Dialog
          open={dopen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are You Sure to delete?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        ></Dialog>

        <Dialog open={open} onClose={handleClose}>
          <Formik values={formikobject}>
            <Form onSubmit={handleSubmit}>
              <DialogTitle id="alert-dialog-title">Add Category</DialogTitle>
              <DialogContent>
                <TextField
                  value={values.name}   
                  margin="dense"
                  id="name"
                  name="name"
                  label="Category Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.name && touched.name ? errors.name : ""}</p>

                <TextField
                  value={values.price}
                  margin="dense"
                  id="price"
                  name="price"
                  label="category price"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.price && touched.price ? errors.price : ""}</p>

                <TextField
                  value={values.quantity}
                  margin="dense"
                  id="quantity"
                  name="quantity"
                  label="category quantity"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>
                  {errors.quantity && touched.quantity ? errors.quantity : ""}
                </p>

                <input
                  name="category_img"
                  type="file"
                  onChange={(e) =>
                    setFieldValue("category_img", e.target.files[0])
                  }
                />
                {errors.category_img && touched.category_img ? (
                  <p>{errors.category_img}</p>
                ) : (
                  ""
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {
                  update ? 
                  <Button type="submit">update</Button>  
                  : <Button type="submit">Submit</Button>
                }
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
      </div>
  );
}

export default Category;
