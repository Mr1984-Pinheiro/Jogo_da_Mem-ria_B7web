import { useEffect, useState } from 'react'
import * as C from './App.styles'
import logoImage from './assets/devmemory_logo.png'
import { Button } from './components/Button'
import { GridItem } from './components/GridItem'
import { InfoItem } from './components/infoItem'
import { items } from './data/items'
import { formatTimerElapsed } from './helpers/formatTimerElapsed'
import IconReStart from './svgs/restart.svg'
import { GridItemType } from './types/GridItemType'


const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(()=>{
    handleReStartAndNew();
  }, []);

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(playing){
        setTimeElapsed(timeElapsed +1);
      }      
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // verify if opened are equal
  useEffect(()=>{
    if(shownCount === 2 ){
      let opened = gridItems.filter(item => item.shomn === true);
      if(opened.length === 2){

        //verifiction - if both are equal, make every "shown" permanent
        if(opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid) {
            if(tmpGrid[i].shomn) {
              tmpGrid[i].permanentShomn = true;
              tmpGrid[i].shomn = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        }

      }
    }
  }, [shownCount, gridItems])

  const handleReStartAndNew = ()=> {
      // PASSO 1 - resetar o jogo
      setTimeElapsed(0);      
      setMoveCount(0);
      setShownCount(0);
      


      //passo 2 - criar o grid 
      // 2.1 -criar um grid vazio
      let tmpGrid: GridItemType[] = [];
      for(let i = 0; i < (items.length * 2); i++) tmpGrid.push({
        item: null, shomn: false, permanentShomn: false
      });

      // 2.2 - preencher o grid
      for (let w = 0; w < 2; w++) {
        for(let i =0; i < items.length; i++) {
          let position = -1;
          while(position < 0 || tmpGrid[position].item !== null) {
             position = Math.floor(Math.random() * (items.length * 2));
          }
          
          tmpGrid[position].item = i;
        }
      }

      // 2.3 - jogar no state
      setGridItems(tmpGrid);

      // passo 3 - começar o jogo
      setPlaying(true);
  }

   const handleItemClick = (index: number) => {
      if(playing && index !== null && shownCount < 2) {
          let tmpGrid = [...gridItems];
          if(tmpGrid[index].permanentShomn === false && tmpGrid[index].shomn === false){
            tmpGrid[index].shomn = true;
            setShownCount(shownCount + 1);
          }
          setGridItems(tmpGrid);
      }
   }

  return(
    <C.Container>
      <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} width="200" alt="" />
          </C.LogoLink>

          <C.InfoArea>              
              <InfoItem label='Tempo' value={formatTimerElapsed(timeElapsed)} />
              <InfoItem label='Movimentos' value='0' />
          </C.InfoArea>

          <Button  label='Reiniciar' onClick={handleReStartAndNew} icon={IconReStart} />

          

      </C.Info>
      <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index)=>(
                  <GridItem
                    key={index}
                    item={item}
                    onClick={() => handleItemClick(index)}
                  
                  />
            ))}
          </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App;