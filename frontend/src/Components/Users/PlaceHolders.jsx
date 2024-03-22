import React from 'react'
import CardMedia from '@mui/material/CardMedia';
export function PlaceHoldersImageCard() {
    return (
        <CardMedia
            component="img"
            style={{ objectFit: "fill", width: '15vw', height: '15vw', borderRadius: '5px', minWidth: '182px', minHeight: '182px' }}
            image={"/images/loadingImages.gif"}
            alt={"PlaceHoldersImage"}
            loading="lazy"
        />
    )
}
