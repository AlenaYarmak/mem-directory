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
            <div className='grid grid-cols-4 gap-4 max-w-5xl p-2 mx-auto' >
                {memesData.memes.map((item, index) => (
                    <Card
                        key={index}
                        isPressable
                        shadow='sm'
                        onPress={() => console.log('item pressed')}
                        className='py-4'
                    >
                        <CardBody className='overflow-visible py-2'>
                            <Image
                                className='object-cover rounded-xl'
                                width={270}
                                alt={item.name}
                                src={`https://img.heroui.chat/image/ai?w=400&h=300&u=${index}`}
                            />
                        </CardBody>
                        <CardFooter className='text-small'>
                            <p className='text-default-500'>{item.name}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
    )
}

export default CardsList;