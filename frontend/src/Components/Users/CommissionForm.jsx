import React from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../../css/CommissionForm.css';

import Box from '@mui/material/Box';

import {useFormik} from 'formik';
import * as Yup from "yup";

export default function CommissionForm() {

    const formik=useFormik({
        validateOnChange:false,
        validateOnBlur:false,
        initialValues:{
         
         description:"",
       

        },
      
       onSubmit: (values)=>{
       fetch(URL, {  method: 'POST',
         body: JSON.stringify(values),  headers: {
         'Content-Type': 'application/json'
         },
         credentials: 'same-origin'
         }).then(response =>{
           if(!response.ok){
               throw new Error(`HTTP Status: ${response.status}`)
           }
           return response.json()
         })            
        //  .then(setOpen(true))
         .catch(error => console.log(error.message));
     },
     
        validationSchema: Yup.object({
         
         description:Yup.string().required("Must be 6 characters or more.").min(6, "Must be 6 characters or more"),
     
       }),
     
     
     
     })

  return (
    <div className='commission'>
    <Box 
//   height=auto
width={700}
my={4}
display="flex"
alignItems="center"

//   justifyContent="center"
gap={4}
p={2}
sx={{ border: '2px solid grey' }}
style={{ background:' whitesmoke',margin:'auto', paddingLeft:'35px',paddingRight:'35px',marginBottom:'40px', transform: 'translateY(8%)'}}

>
  <form onSubmit={formik.handleSubmit}>
      <Grid className='formregister' container spacing={2} component="form" noValidate>
      <Grid  item xs={12}>
       <div className='header'>
        <Typography variant="h5" component="h1" gutterBottom>
        Art Commission Request
        </Typography></div>
      </Grid>
     
      <Grid item xs={12}>
        <TextField
          disabled
          id="userName"
          label="User Name"
          
          defaultValue="TAT610"
          fullWidth
          value={formik.values.userName} onChange={formik.handleChange}
        />
         {formik.errors.userName && (<Typography variant="body2" color="red">{formik.errors.userName}
        </Typography>)} 
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled
          id="phone"
          label="Phone Contact"
          name="phone"
          autoComplete="email"
          fullWidth
          value={formik.values.phone} onChange={formik.handleChange}
        />
         {formik.errors.phone && (<Typography variant="body2" color="red">{formik.errors.phone}
        </Typography>)} 
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          fullWidth
          value={formik.values.email} onChange={formik.handleChange}
        />
         {formik.errors.email && (<Typography variant="body2" color="red">{formik.errors.email}
        </Typography>)} 
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="description"
          label="Description"
          name="description"
          autoComplete="email"
          fullWidth
          multiline // Thêm thuộc tính multiline
          rows={5} // Đặt số hàng mong muốn    
          value={formik.values.description} onChange={formik.handleChange}
        />
        <Grid item xs={12}>
        <div className='note'>*Suggestion: You can fill in the box describing the size of the art and the time you want to complete the work.</div>
        </Grid>
         {formik.errors.description && (<Typography variant="body2" color="red">{formik.errors.description}
        </Typography>)} 
      </Grid>
      
 

      <Grid item xs={12}>
        <Button variant="contained" type='submit' style={{marginBottom:'20px'}} fullWidth>
          Submit
        </Button>
      </Grid>


    </Grid></form>
    </Box>
</div>
  )
}
