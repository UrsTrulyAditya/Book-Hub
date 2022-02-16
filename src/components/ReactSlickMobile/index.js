import Slider from 'react-slick'
import {Link} from 'react-router-dom'

/* Add css to your project */
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const ReactSlickMobile = props => {
  const {booksList} = props

  return (
    <>
      <div className="main-container  ">
        <div className="books">
          <h1 className="heading">Top Rated Books</h1>

          <div>
            <Link to="/shelf">
              <button type="button" className="books-button">
                Find Books
              </button>
            </Link>
          </div>
        </div>

        <ul className="slick-container">
          <Slider {...settings}>
            {booksList.map(each => {
              const {id, coverPic, title} = each
              return (
                <li className="carosel">
                  <Link to={`/books/${id}`} className="link-item">
                    <div className="list-item text-box" key={id}>
                      <img className="logo-image" src={coverPic} alt={title} />
                    </div>
                  </Link>
                </li>
              )
            })}
          </Slider>
        </ul>
      </div>
    </>
  )
}

export default ReactSlickMobile
