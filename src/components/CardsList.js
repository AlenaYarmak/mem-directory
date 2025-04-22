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
            <div className='card__container'>
                {memesData.memes.map((item, index) => (
                    <Card
                        key={index}
                        isPressable
                        shadow='sm'
                        onPress={() => console.log('item pressed')}
                        className='w-full'
                    >
                        <CardBody className='overflow-visible p-0'>
                            <Image
                                className='w-full object-cover h-[140px]'
                                alt={item.name}
                                src={`https://img.heroui.chat/image/ai?w=400&h=300&u=${index}`}
                            />
                        </CardBody>
                        <CardFooter className='text-small justify-between'>
                            <p className='text-default-500'>{item.name}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
    )
}

export default CardsList;