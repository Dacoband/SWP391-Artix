import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

const GridContainer = styled(Grid)({
  height: '90%', // Thiết lập chiều cao của grid container là 100%
});


export default function Container() {
 

  return (
    <div className='container' > 


<Box className='inforimage' sx={{ flexGrow: 1 }}>
      <GridContainer container spacing={2} columns={16} >
        <Grid item className='item1'  xs={8}>
          
          <Paper>
            
            <div>
            <img src="./public/img/test.jpg" alt="Image" class="img-responsive" />
            
            </div>

            
          
          
          </Paper>
        </Grid>


        <Grid item className='item2' style= {{paddingLeft:'0'}} xs={8}>
        <Paper  style={{ display: 'flex', justifyContent: 'flex-end' }}>
            
            <FavoriteBorderIcon style={{paddingLeft:'30',fontSize:'35',paddingRight:'10' }}/>
            <CommentIcon  style={{fontSize:'35',paddingRight:'10' }}/>
            <AddShoppingCartIcon  style={{fontSize:'35',paddingRight:'10' }}/>
            <div style={{ marginLeft: 'auto' }}> 
          <TurnedInNotIcon style={{ fontSize: '35',marginRight:'30' }} />
    </div> 
    
    
    
    

           

          
          
          
          
          
          
          </Paper>
        
          
        </Grid>
      </GridContainer>
    </Box>
       {/* <Box sx={{ width: '800px',margin: 'auto' , float:'right'}}>
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
    </Box> */}

    
  </div>
  )
}

