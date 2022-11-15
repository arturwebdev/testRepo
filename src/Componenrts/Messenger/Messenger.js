import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addMessage, addMessageInsta, instaBotMess, selectMessege } from '../../store/slices/messege/messegeSlice'
import { selectUsers } from '../../store/slices/users/usersSlice'
import './Messenger.css'

function Messenger() {
    const {currentUser} = useSelector(selectUsers)
    const navigate = useNavigate()
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const {message} = useSelector(selectMessege)
    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    },[currentUser])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        dispatch(addMessage({mess: formRef.current[0].value, user: currentUser.username}))
        
        dispatch(instaBotMess({mess: formRef.current[0].value, user: currentUser.username}))
        
        setTimeout(() => {
            dispatch(addMessageInsta(currentUser.username))
        },1000)
        
        
        formRef.current.reset()
    }

    return (
        <div className="messenger">
            <div className='container'>
                <div className="mess">
                    <div className="users">
                        <div className="userone">
                                <div className="image">
                                    <img src="https://phonoteka.org/uploads/posts/2021-07/1625611256_28-phonoteka-org-p-ilon-mask-art-krasivo-30.jpg" alt="" />
                                </div>
                                <div className='name'>
                                        <h2>{currentUser?.username}</h2>
                                </div>
                        </div>
                        <div className="usertwo">
                                <div className='name'>
                                        <h2>InstaBot</h2>
                                </div>
                                <div className="image">
                                    <img src="https://banner2.cleanpng.com/20180325/pcw/kisspng-computer-icons-user-profile-avatar-avatar-5ab751f86d73d2.5490619515219635124483.jpg" alt="" />
                                </div>
                        </div>
                    </div>
                    <div className="desctop">
                            {
                                message.map(mess => (
                                    <div key={mess.id}>
                                    <div className='messDesc'
                                    style={{
                                        marginLeft: mess.user === 'Instabot' ? '45%' : '0'
                                    }} 
                                    >{mess.mess}</div>
                                    </div>
                                ))
                            }
                    </div>
                    <div className="form">
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <input type="text" 
                            placeholder='Send your message'
                            />
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger