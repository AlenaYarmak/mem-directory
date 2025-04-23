import { 
    Card, 
    CardHeader, 
    CardBody, 
    CardFooter, 
    Divider, 
    Link, 
    Image 
} from '@heroui/react';

const STORAGE_KEY = 'meme_data';

const CardsList = () => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    let memesData = { memes: [] };

    try {
        if (storedData) {
            memesData = JSON.parse(storedData);
        } else {
            console.log('No memes found')
        }
    } catch (error) {
        console.log('Error parsing')
    }

    return (
            <div className='grid grid-cols-4 gap-4 max-w-5xl py-4 mx-auto' >
                {memesData.memes.map((item, index) => (
                    <Card
                        key={index}
                        isPressable
                        shadow='sm'
                        onPress={() => console.log('item pressed')}
                        className='py-4'
                    >
                        <CardBody className='overflow-visible flex flex-col justify-between'>
                            <Image
                                className='object-cover rounded-xl pb-2'
                                width={270}
                                height={150}
                                alt={item.name}
                                src={item.url}
                            />

                            <p className='text-default-500 pb-1'>{item.name}</p>
                            <Divider />
                            <p className='text-default-500'>Likes - {item.likeCounter}</p>

                            
                        </CardBody>
                        <CardFooter className='text-small'>
                            <Link 
                                href={item.url}
                                className='text-wrap'>Visit source</Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
    )
}

export default CardsList;