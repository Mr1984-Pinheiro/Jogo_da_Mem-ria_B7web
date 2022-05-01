import { GridItemType } from '../../types/GridItemType'
import * as C from './styles'
import imageB7 from '../../svgs/b7.svg'
import { items } from '../../data/items'


type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({ item, onClick }: Props) => {
    return (
        <C.Container onClick={onClick} >
            {item.permanentShomn === false && item.shomn === false && 
                <C.Icon src={imageB7} alt="" />
            }
            {(item.permanentShomn || item.shomn) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt="" />    
            }
        </C.Container>
    )
}