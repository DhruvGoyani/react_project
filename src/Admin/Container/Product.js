// import Dialog  from './Dialog'
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import { DialogContentText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useDispatch, useSelector } from "react-redux";
import { GetCategorydata } from "../../Redux/Action/Category.Action";
import {
  addProduct,
  deleteproduct,
  editproduct,
  Productdata,
} from "../../Redux/Action/Product.Action";




export default function Product() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [Update, setUpdate] = useState();
  const [dopen, setDopen] = React.useState(false);
  const [did, setDid] = useState();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const Category = useSelector( state => state.category);

  console.log(Category);

  useEffect(() => {
    dispatch(GetCategorydata());
    console.info("Category++",Category)
  }, [open])

  // console.log(products);

  const handleClickDopen = (id) => {
    setDopen(true);
    setDid(id);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setUpdate();
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate();
    setDopen();
    formik.resetForm();
  };

  let datad = {
    name: yup.string().required("enter name"),
    price: yup.number().required("enter price"),
    categoryname: yup.string().required("please enter your categoryname"),
    file: yup.mixed().required("please select file"),
  };

  let schema = yup.object().shape(datad);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      categoryname: "",
      file: "",
    },
    validationSchema: schema,
    onSubmit: (value, { resetForm }) => {
      if (Update) {
        handleupdate(value);
      } else {
        handleSubmitdata(value);
        console.log(value);
      }
      resetForm();
      dispatch(GetCategorydata());
    },
  });

  const handleupdate = (value) => {
    console.log(value);
    // let localdata = JSON.parse(localStorage.getItem("product"));

    // let udata = localdata.map((l, i) => {
    //   if(l.id === value.id) {
    //       return value;
    //   } else {
    //     return l;
    //   }
    // })
    // console.log(udata);

    // localStorage.setItem("product", JSON.stringify(udata))

    dispatch(editproduct(value));
    setOpen(false);
    setUpdate();
    loadData();
  };

  const handleSubmitdata = (values) => {
    console.log(values);
    // let localdata = JSON.parse(localStorage.getItem("product"))

    // let data = {
    //   id: Math.floor(Math.random() * 1000),
    //   ...values
    // }

    // if (localdata === null) {
    //   localStorage.setItem("product", JSON.stringify([data]))
    // } else {
    //   localdata.push(data)
    //   localStorage.setItem("product", JSON.stringify(localdata))
    // }

    dispatch(addProduct(values));

    setOpen(false);
    loadData();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "categoryname", headerName: "Categoryname", width: 130 },
    {
      field: "url",
      headerName: "image",
      width: 130,

      renderCell: (params) => (
        <img src={params.row.url} width={50} height={50} />
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="delete"
            onClick={() => handleClickDopen(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
            <CreateIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (data) => {
    setOpen(true);
    setUpdate(data);
    formik.setValues(data);
    // console.log(data);
  };

  const handleDelete = (id) => {
    console.log(id);
    // let localData = JSON.parse(localStorage.getItem("product"))

    // let filterData = localData.filter((v, i) => v.id !== did);

    // localStorage.setItem("product", JSON.stringify(filterData));

    dispatch(deleteproduct(did));

    loadData();
    setDopen(false);
  };

  const loadData = () => {
    // let localData = JSON.parse(localStorage.getItem("product"))

    // if (localData !== null) {
    setData(products.product);
    // }
  };

  useEffect(() => {
    dispatch(Productdata());
    loadData();
  }, []);

  console.log(products.product);
  // console.log(formik.errors);

  return (
    <>
      <Box>
        <Container>
          <div>
            <Button variant="outlined" onClick={() => handleClickOpen()}>
              Add Product
            </Button>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={products.product}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Product</DialogTitle>
              <Formik value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="name"
                      name="name"
                      type="name"
                      fullWidth
                      variant="standard"
                      onChange={formik.handleChange}
                      defaultValue={formik.values.name}
                      helperText={formik.errors.name}
                      error={formik.errors.name ? true : false}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      className="space1"
                      id="price"
                      label="price"
                      name="price"
                     type="price"
                      fullWidth
                      variant="standard"
                      onChange={formik.handleChange}
                      defaultValue={formik.values.price}
                      helperText={formik.errors.price}
                      error={formik.errors.price ? true : false}
                    />
                    <select
                      onChange={formik.handleChange}
                      name="categoryname"
                      className="form-select space"
                    >
                      {Category.category.map((k) =>{
                        console.log(k);
                        return <option value={k.id}>{k.categoryname}</option>;
                      })}
                    </select>

                    <input
                      type="file"
                      name="file"
                      id="file"
                      fullWidth
                      variant="standard"
                      onChange={(e) =>
                        formik.setFieldValue("file", e.target.files[0])
                      }
                      defaultValue={formik.values.file}
                      helperText={formik.errors.file}
                      error={formik.errors.file ? true : false}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {Update ? (
                      <Button type="submit">Update</Button>
                    ) : (
                      <Button type="submit">Submit</Button>
                    )}
                  </DialogActions>
                </Form>
              </Formik>
            </Dialog>
            <div>
              <Dialog
                open={dopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are You Sure Delete  Data ...? "}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description"></DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleDelete()}>yes</Button>
                  <Button onClick={handleClose}>No</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </Container>
      </Box>
    </>
  );
}
