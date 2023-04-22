import React,{FC} from 'react'
import './styles/pic1.css'
import {Box,Grid, GridItem, SimpleGrid, Stack, HStack, VStack, Image, Text, Flex, Heading } from '@chakra-ui/react';

// import { Grid } from '@material-ui/core';
const MyComponentOne: FC = () => {
    return (
      <div>
        <div className='first-pic grid-container'>
          <div className='grid-item-1'>
            <Text>Hello 👋 Thanks for installing me. Let me get you started real quick.</Text>
          </div>
          <div className='grid-item-1'>
            <img src="./assets/robot_3d.png"/>
          </div>
        </div>
        
        <div className='second-pic grid-container-2'>
        <div className='grid-item-2'>
            <Text>You can open me with shortcuts from any website</Text>
            <img src='./assets/Group_6.png'style={{maxHeight: '50%', maxWidth: '50%',marginBottom:'30px'}} />
            <img src='./assets/Group_7.png'style={{maxHeight: '50%', maxWidth: '50%'}} />
            
          </div>
          <div className='grid-item-2 main-img'>
            <img src="./assets/chat_bot_ui.png"/>
          </div>
        </div>
        
        <div className='third-pic grid-container-3'>
          <div className='grid-item-3'>
            <Text>Select text from any website to get quick menu with prompts you can use on the text selection</Text>
          </div>
          <div className='grid-item-3 main-img'>
            <img src="./assets/web_ui.png"/>
          </div>
        </div>
        <div className='fourth-pic grid-container-4'>
          <div className='grid-item-4'>
            <Text>You can tweek settings and also write your own custom prompts to adjust me to your workflow</Text>
          </div>
          <div className='grid-item-4 main-img'>
            <img src='./assets/setting_screenshot.png'/>
          </div>
        </div>

        <div className=' fifth-pic grid-item-5'>
          <div className='grid-item-5-1'>
            <Text>
              <Text>Happy Browsing<br/></Text>
              <Text style={{color: '#bf712c', padding: '30px', fontSize: '20px'}}>
                I am 100% Free and Open Source <br/>
                Made with ❤ from INDIA <br/>
                If you want to contribute to extension check out for GITHUB REPO <br/>
              </Text>
            </Text>
          </div>
        </div>
        
      </div>
      
    );
  };
  
  export default MyComponentOne;
// export default PictureOne
