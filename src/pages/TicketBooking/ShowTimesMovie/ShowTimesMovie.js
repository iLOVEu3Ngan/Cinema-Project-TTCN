import React from "react";
import "./ShowTimesMovie.css";
import { useDispatch } from "react-redux";
import { actReceiveMovieChoosing } from "../../../actions/action";
import history from "../../../commons/history";

function ShowTimesMovie(props) {
  const dispatch = useDispatch();

  const receiveMovieChoosing = (movie, date, time, idUser) => {
    dispatch(actReceiveMovieChoosing(movie, date, time, idUser));
  };

  const handleOnChooseSession = (item, session, account, movie) => {
    console.log(account);
    if (account && Object.keys(account).length > 0) {
      receiveMovieChoosing(movie, item, session, account._id);
      const slug = movie.slug;
      history.push(`/buy-ticket-detail/${slug}`);
    } else {
      alert("Vui lòng đăng nhập!");
    }
  };

  let { date, account, itemMovieInfo } = props;
  let dataShowtime = date.frameTime.map((frameTime, index) => {
    let session = frameTime.time;
    return (
      <div
        key={index}
        className="col-3 col-md-2 col-lg-2 session"
        onClick={() =>
          handleOnChooseSession(date, session, account, itemMovieInfo)
        }
      >
        {session}
      </div>
    );
  });
  return (
    <div className="row mt-5">
      <div className="col-md-10 col-lg-10">
        <div className="detail-row">
          <div className="detail-title-showtime">
            <p className="title-showtime">{props.date.dateMovie}</p>
          </div>
          <div className="detail-showtime ">
            <div className="detail-showtime-item row d-flex justify-content-center">
              {dataShowtime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ShowTimesMovie);
