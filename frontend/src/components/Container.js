import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CommentIcon from '@mui/icons-material/Comment';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function Container() {
  return (
    <div className='container' > 
       <Box sx={{ width: '800px',margin: 'auto' , float:'right'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item className='item1' style={{padding:'0' }}xs={12}>
          <Paper>
            
            <div>
            <img src="./public/img/test.jpg" alt="Image" class="img-responsive" />
            
            </div>

            
          
          
          </Paper>
        </Grid>
        <Grid item style={{padding:'0'}} xs={12}>
          
          <Paper className='item2' style={{ display: 'flex', justifyContent: 'flex-end' }}>
            
            <FavoriteBorderIcon style={{paddingLeft:'30',fontSize:'35',paddingRight:'10' }}/>
            <CommentIcon  style={{fontSize:'35',paddingRight:'10' }}/>
            <AddShoppingCartIcon  style={{fontSize:'35',paddingRight:'10' }}/>
            <div style={{ marginLeft: 'auto' }}> 
          <TurnedInNotIcon style={{ fontSize: '35',marginRight:'30' }} />
    </div> 
    
    
    
    

           

          
          
          
          
          
          
          </Paper>
        </Grid>
       
      </Grid>
    </Box>

    
  </div>
  )
}

