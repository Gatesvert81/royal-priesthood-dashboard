import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import worship1 from '../../public/worship-1.jpg'
import Button from './Button'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { db } from '../Firebase/firebaseConfig'
import ValueCard from './ValueCard'
import DoCard from './DoCard'
import VideoCard from './VideoCard'
import AudioCard from './AudioCard'
import EventCard from './EventCard'

function EditCard({
    children,
    collection,
    document,
}) {
    const [data, setData] = useState(null)
    const [sections, setSections] = useState([])
    const [edit, setEdit] = useState(true)
    const [images, setImages] = useState([])
    const [imagesUrl, setImagesUrl] = useState([])
    const [cardsData, setCardsData] = useState([])
    const [imageFile, setImageFile] = useState(null)
    const [imageEdit, setImageEdit] = useState(null)
    const [editImage, setEditImage] = useState(false)


    // Storage ref for downloading and uploading images
    const storage = getStorage();
    const imageListRef = ref(storage, `${collection}/${document}`);

    useEffect(() => {
        //Get data of Section
        const docRef = doc(db, collection, document);
        const docSnap = getDoc(docRef)
        docSnap.then((snapshot) => {
            setData(snapshot.data())
        })
            .catch((error) => {
                console.log(error)
            });
    }, [])

    useEffect(() => {
        // Getting images and  Meta data from Images in section
        const imageList = []
        listAll(imageListRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    imageList.push(itemRef.fullPath)
                });
                setImages([...imageList])
            })
            .catch((error) => {
                console.log(error)
            });
    }, [])

    useEffect(() => {
        //Get all sections from Data
        if (data !== null) {
            setSections(Object.keys(data))
            if (data.hasOwnProperty('Cards')) {
                // Get all card data
                setCardsData(Object.values(data?.Cards))
            }
        }
        console.log(data)
    }, [data])

    useEffect(() => {
        // Add image section if there are images avalable for the section
        if (images.length > 0) {
            setSections([
                ...sections,
                "images"
            ])
        }

        // Get all images url
        let allImages = []
        images.forEach(async (image) => {
            await getDownloadURL(ref(storage, image))
                .then((url) => {
                    allImages.push(url)
                })
                .catch((error) => {
                    console.log(error)
                })
            setImagesUrl([...allImages])
        })
    }, [images])

    const handleCardDetail = (e, index) => {
        // Set data of card section being changes
        let newCard = [...cardsData]
        newCard[index] = {
            ...newCard[index],
            [e.target.name]: e.target.value
        }
        //Update overall section data 
        setData({
            ...data,
            Cards: {
                ...data?.Cards,
                [`Card ${index + 1}`]: {
                    ...data?.Cards[`Card ${index + 1}`],
                    [e.target.name]: e.target.value
                }
            }
        })
        //Update the card data
        setCardsData([
            ...newCard
        ])
    }

    const handleSectionDetail = (e) => {
        // Set data of section being changed
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleImage = (e, index) => {
        // Get image file from image input
        const file = e.target
        setImageFile(file?.files[0])
        // Set storage ref from image
        const storageRef = ref(storage, `${collection}/${document}/${imageFile?.name}`);

        // Set delete ref for image to be deleted
        console.log(images[index])

        // switch (imageEdit) {
        //     case "Delete":
        //         // Delete Image file in Firebase Storage
        //         deleteObject(desertRef).then(() => {
        //             console.log('File deleted successfully')
        //         }).catch((error) => {
        //             console.log(error)
        //         });
        //         break;
        //     case "Update":

        //         // Update Image file to Firebase Storage
        //         deleteObject(desertRef).then(() => {
        //             console.log('File deleted successfully')
        //             uploadBytes(storageRef, imageFile).then((snapshot) => {
        //                 console.log('Uploaded a blob or file!');
        //             });
        //         }).catch((error) => {
        //             console.log(error)
        //         });
        //         break;

        //     default:
        //         break;
        // }
        setEditImage(false)
    }

    const cardEditInput = (index, cardData) => {
        // Get all section of card
        const cardSections = Object.keys(cardData)
        // Display sections 
        return (
            <div >
                <p className='card__title' > card {index + 1}  </p>
                {
                    cardSections.map((cardSection) => (
                        <div key={cardSection} >
                            {
                                cardSection === 'Description' ? (
                                    <div>
                                        <p className='card__title'> Description </p>
                                        <textarea type="text" onChange={(e) => handleCardDetail(e, index)} defaultValue={cardData?.Description} className='text__input h-20' name='Description' />
                                    </div>
                                ) : cardSection === 'Date' ? (
                                    <div>
                                        <p className='card__title'> Date </p>
                                        <input type="datetime-local" onChange={(e) => handleCardDetail(e, index)} defaultValue={cardData?.Date} className='text__input' name='Date' />
                                    </div>
                                ) : (
                                    <div>
                                        <p className='card__title'> {cardSection} </p>
                                        <input type="text" onChange={(e) => handleCardDetail(e, index)} defaultValue={cardData[cardSection]} className='text__input' name={cardSection} />
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        )
    }

    const displayCards = () => {
        // Display Card Based on the cardstyle of section
        switch (data?.Cardstyle) {
            case "Value":
                return cardsData?.map((cardData, index) => {
                    edit ? (
                        <ValueCard
                            key={cardData?.Title}
                            data={cardData}
                            index={index}
                        />
                    ) : (
                        <>
                            {cardEditInput(index, cardData)}
                        </>
                    )
                })
            case "Do":
                return cardsData?.map((cardData, index) => {
                    edit ? (
                        <DoCard
                            key={cardData?.Title}
                            title={cardData?.Title}
                            descripton={cardData?.Description}
                        />
                    ) : (
                        <>
                            {cardEditInput(index, cardData)}
                        </>
                    )
                })
            case "Video":
                return cardsData?.map((cardData, index) => {
                    edit ? (
                        <VideoCard
                            key={cardData?.Title}
                            data={cardData}
                        />

                    ) : (
                        <>
                            {cardEditInput(index, cardData)}
                        </>
                    )
                })
            case "Audio":
                return cardsData?.map((cardData, index) => {
                    edit ? (
                        <AudioCard
                            key={cardData?.Title}
                            data={cardData}
                        />

                    ) : (
                        <>
                            {cardEditInput(index, cardData)}
                        </>
                    )
                })
            case "Event":
                return cardsData?.map((cardData, index) => {
                    edit ? (
                        <EventCard
                            key={cardData?.Title}
                            data={cardData}
                        />
                    ) : (
                        <>
                            {cardEditInput(index, cardData)}
                        </>
                    )
                })
            default:
                break;
        }
    }


    const handleForm = (e) => {
        e.preventDefault()
        // Upload section content changes to firebase firestore
        // setDoc(doc(db, collection, document), data)

        // Check for Image file
        // if (sections?.includes('images') && (imageFile)) {
        //     const storageRef = ref(storage, `${collection}/${document}/${imageFile?.name}`);
        //     // Upload Image file to Firebase Storage
        //     uploadBytes(storageRef, imageFile).then((snapshot) => {
        //         console.log('Uploaded a blob or file!');
        //     });
        // }
        setEdit(!edit)
    }

    return (
        <section>
            <div className="medium__text" >
                <p>{document}</p>
            </div>
            <form className='grid__items w-full h-fit p-2 rounded shadow-md ' onSubmit={handleForm} >
                {sections?.includes('Title') ? (
                    <div>
                        <p className='card__title' > Title </p>
                        <input readOnly={edit} type="text" onChange={handleSectionDetail} defaultValue={data?.Title} className='text__input' name='title' />
                    </div>
                ) : null}
                {sections?.includes('Description') ? (
                    <div>
                        <p className='card__title'> Description </p>
                        <textarea readOnly={edit} type="text" onChange={handleSectionDetail} defaultValue={data?.Description} className='text__input h-20' name='description' />
                    </div>
                ) : null}
                {sections?.includes('Cards') ? (
                    <div className='grid__items' >
                        {displayCards()}
                    </div>
                ) : null}
                {sections?.includes('images') ? (
                    <div className='grid__items'>

                        <p className='card__title'> Image </p>
                        {
                            imagesUrl?.map((image, index) => (
                                <div className='grid__items' key={index} >
                                    {
                                        edit ? null : (
                                            <div className='grid__items' >
                                                <div className="w-full flex flex-row justify-between items-center" >
                                                    <Button click={() => {
                                                        setEditImage(true)
                                                        setImageEdit("Replace")
                                                    }} >
                                                        Replace
                                                    </Button>
                                                    <Button click={() => {
                                                        setEditImage(true)
                                                        setImageEdit("Delete")
                                                    }}>
                                                        Delete
                                                    </Button>
                                                </div>
                                                {
                                                    editImage ? (
                                                        <div>
                                                            <input type='file' onChange={(e) => handleImage(e, index)} name="image" />
                                                        </div>
                                                    ) : null
                                                }
                                            </div>
                                        )
                                    }
                                    <div className=" w-full h-44 relative self-end "  >
                                        <Image src={image} layout="fill" className="object-cover" alt="worship" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : null}
                <div>
                    {children}
                </div>
                <div className='w-full h-fit flex flex-row justify-between items-center' >
                    <Button style={`primary ${edit ? null : "bg-slate-300"} `} disable={!edit} click={() => setEdit(!edit)}  >
                        Edit
                    </Button>
                    {edit ? null : (
                        <Button style="primary" type="submit" >
                            Save
                        </Button>
                    )}
                </div>
            </form>
        </section>
    )
}

export default EditCard