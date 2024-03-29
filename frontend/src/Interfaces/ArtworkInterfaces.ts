export interface Artwork{
  artworkID: string,
  creatorID: string,
  artworkName: string,
  description: string,
  dateCreated: Date,
  likes: number,
  purchasable: false,
  price: number,
  imageFile: string,
  artworkTag: [
    {
      "artworkTagID": number,
      "artworkID": number,
      "tagID": number
    },
  ]
}