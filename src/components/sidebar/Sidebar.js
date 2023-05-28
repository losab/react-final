import { Drawer } from '@mui/material'
import React from 'react'
import { useProduct } from '../../hooks/useProduct';
import { SidebarContent } from './SidebarContent'

export const Sidebar = ({isDrawerOpen, setDrawerOpen}) => {
    const {categories} =useProduct();
  return (
<>

<Drawer variant='temporary' 
open={isDrawerOpen} 
onClose={()=>{
    setDrawerOpen(!isDrawerOpen)
}}
ModalProps={{
    keepMounted:true,
}}
sx={{
    display:{xs:"block", sm:"none"},
    "& .MuiDrawer-paper" :{
        boxSizing:"border-box",
        width:"225px"
    }
}}
>
   <SidebarContent sidebarItems={categories}/> 
     </Drawer>
     <Drawer variant='permanent' 
     open={isDrawerOpen} 
     onClose={()=>{
         setDrawerOpen(!isDrawerOpen)
     }}
     ModalProps={{
         keepMounted:true,
     }}
     sx={{
         display:{xs:"none", sm:"block"},
         "& .MuiDrawer-paper" :{
             boxSizing:"border-box",
             width:"255px"
         }
     }}> 
     <SidebarContent sidebarItems={categories}/>

     </Drawer>


</>  
  )
}
