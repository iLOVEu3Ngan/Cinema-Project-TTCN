import React from "react";
import "./MovieItem.css";
import { Link } from "react-router-dom";
import { addMovieInformation } from "../../actions/action";
import { useDispatch } from "react-redux";

function MovieItem(props) {
  const dispatch = useDispatch();
  const onTicketBooking = (movie) => {
    dispatch(addMovieInformation(movie));
  };
  let { movie } = props;
  return (
    <div className="col-lg-4 col-md-6 col-sm-6 p-2 mt-2">
      <div className="box">
        <img alt="" src={movie.image} />
        <div className="box-content">
          <h6 className="title">{movie.name}</h6>
          <span className="post">{movie.type}</span>
          <ul className="icon">
            <li>
              <Link to="/ticket-booking" className="mt-3">
                <i
                  className="fas fa-shopping-cart"
                  onClick={() => onTicketBooking(movie)}
                ></i>
              </Link>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MovieItem);
