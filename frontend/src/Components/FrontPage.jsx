import React from 'react'
import LoginForm from './Forms/LoginForm';
import {useHandleClick} from '../CustomHooks/HandleClick';
import Background from './Themes/Background.jsx'

export default function FrontPage() {
  const [handleClick] =  useHandleClick();
  return (

    <Background>
    <LoginForm handleClick={handleClick} disableOutsideClick={true} alternative={true} backdrop={""}/>
    </Background>
  )
}
