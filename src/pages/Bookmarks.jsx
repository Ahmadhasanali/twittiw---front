import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Sidebar from '../Components/Sidebar'
import Avatar from 'react-avatar';

function Bookmarks() {

    const CardPost = () => {
        return (
            <section className="card-tweet" style={{ cursor: 'pointer' }}>
                <Avatar color={Avatar.getRandomColor(['red', 'green', 'blue'])} name="Name" round size='40px' />
                <span> Name<span className="username">@username</span></span>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eveniet sunt aut commodi doloribus, nemo doloremque iusto exercitationem. Provident cupiditate deleniti sed mollitia explicabo corporis eum facilis vitae eos magnam quisquam amet fugiat quo reiciendis dicta voluptatum velit dolore corrupti officiis delectus quis consequatur, vel odio! Esse nemo pariatur, eius inventore nostrum optio, corrupti, blanditiis non adipisci eum iste commodi!
                </p>
                <div className="like-rt-reply">
                    <FontAwesomeIcon className="icon" icon={faComment} />
                    <FontAwesomeIcon className="icon" icon={faRetweet} />
                    <FontAwesomeIcon className="icon" icon={faHeart} />
                </div>
            </section>
        )
    }

    return (
        <Sidebar>
            <header>
                <h3 className='ps-4'> Bookmarks</h3>
                <p className='ps-4' style={{ color: 'GrayText' }}>@username</p>
            </header>
            
            <CardPost/>
            <CardPost/>
            <CardPost/>
           
        </Sidebar>
    )
}

export default Bookmarks