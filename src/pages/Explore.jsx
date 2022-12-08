import { faCommenting, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import covidImage from 'https://pbs.twimg.com/semantic_core_img/1255900301405458433/qNZATm4y?format=jpg&name=240x240';
import CardPost from '../Components/CardPost';
import Sidebar from '../Components/Sidebar'

const Explore = () => {

    const staticPosts = [
        {
            id: 4,
            content: `Good luck team!!! @TeamLiquidBR Cheering for you from the EU facility 💙 VAMOS #LETSGOLIQUID #VCTGameChangers`,
            user: {
                fullName: 'Team Liquid Valorant',
                userName: 'liquidvalorant'
            }
        },
        {
            id: 5,
            content: `Check out these @TeamLiquidBR crosshairs 🎯`,
            user: {
                fullName: 'VALORANT Champions Tour',
                userName: 'valorantEsports'
            }
        },
        {
            id: 6,
            content: `New Skinline: Abyssal`,
            user: {
                fullName: 'Mike | Valorant Leaks & News',
                userName: 'ValorLeaks'
            }
        },
    ]

    return (
        <Sidebar>
            <section className='headline p-3'>
                <p className="category">Television · <span>3 Hours Ago</span></p>
                <h1 className="headline-title">Chicago Fire Airing on NBC</h1>
            </section>
            <section className="trends-for-you p-3">
                <h3>Trends for You</h3>
                <div className="trending-item">
                    <div className="trending-topics">
                        <p>Meyden</p>
                        <p className="total-tweets">15.3k Tweets</p>
                    </div>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <div className="trending-item">
                    <div className="trending-topics">
                        <p>#90minuteswithronaldo</p>
                        <p className="total-tweets">7k Tweets</p>
                    </div>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <div className="trending-item">
                    <div className="trending-topics">
                        <p>Hello World</p>
                        <p className="total-tweets">25.3k Tweets</p>
                    </div>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </section>
            <section className="whats-happening p-3">
                <h3>What's Happening</h3>
                <div className="trending-item">
                    <div className="trending-topics">
                        <p className="category">Covid-19 · <span>Live</span></p>
                        <p className="whats-happening-title">Updates on the Covid-19 situation in Indonesia</p>
                    </div>
                    <div className="wh-image">
                        <img src={`https://pbs.twimg.com/semantic_core_img/1255900301405458433/qNZATm4y?format=jpg&name=240x240`} alt="covid-19" />
                    </div>
                </div>
            </section>
            <section className="topics">
                <h3 className="topic-title m-3">
                    <FontAwesomeIcon icon={faCommenting} className="me-2 icon-comment" />
                    Valorant
                </h3>
                {
                    staticPosts.map(post => (
                        <CardPost key={post.id} post={post} />
                    ))
                }
            </section>
        </Sidebar>
    );
}
 
export default Explore;