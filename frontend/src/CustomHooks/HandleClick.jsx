import {useCallback,useState} from 'react'

export function useHandleClick() {
    const [isOpen,SetIsOpen] = useState(false);
    const handleClick = useCallback(()=>{
        isOpen ? SetIsOpen(false) : SetIsOpen(true)
    },[isOpen])
    return [isOpen,handleClick]
}
