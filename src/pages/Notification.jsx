import { faBell, faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../Components/Sidebar";

const Notification = () => {
    return (
        <Sidebar>
            <h3 className="mx-3">Notifications</h3>
            <section className="notif-menu pt-4">
                <div>All</div>
                <div>Verified</div>
                <div>Mentions</div>
            </section>
            <section className="notification-content pt-3">
                <section className="card-tweet d-flex align-items-center py-3" style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faBell} className='me-3'  style={{ fontSize: '1.2rem', color: '#1D9BF0' }} />
                    <p className="m-0">New Tweet notification for Fabrizio Romano</p>
                </section>
                <section className="card-tweet" style={{ cursor: 'pointer' }}>
                    <p>Elon Musk<span className="username"> @ElonMusk</span></p>
                    <p>@khairunnisa Hey there!</p>
                    <div className="like-rt-reply">
                        <FontAwesomeIcon icon={faComment} />
                        <FontAwesomeIcon className="icon" icon={faRetweet} />
                        <FontAwesomeIcon className="icon" icon={faHeart} />
                    </div>
                </section>
            </section>
        </Sidebar>
    );
}
 
export default Notification;