import moment from "moment";
import {
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  TransformOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import styles from "./tweet.module.css";
import { updateTweet } from "../../services/tweet-service";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import toast from "react-hot-toast";

export default function Tweet({ props }) {
  const { user } = useSelector((state) => state.auth);
  const [tweet, setTweet] = useState({ ...props });

  const [replayTweet, setRplayTweet] = useState("");
  const [newComment, setNewComment] = useState("");

  const [totalRetweet, setTotalRetweet] = useState(0);
  const [totalComment, setTotalComment] = useState(0);
  const likeTweet = () => {
    updateTweet({ tweet, likeId: user._id }, user.accessToken).then(
      (response) => {
        setTweet(response);
      }
    );
  };

  const likeCheck = () => {
    const found = tweet.likes.find((element) => element === user?._id);

    return found ? true : false;
  };

  const handleDelete = async (id) => {
    {
      try {
        const { data } = await axios.delete(
          `http://localhost:8000/tweets/delete/${id}`
        );

        toast.success("Tweet Deleted Suceessfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // retweet

  const retweet = async (id) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/tweets/retweet/${id}`,
        { replayTweet }
      );
      setRplayTweet(data.retweet);
      toast.success("Retweet added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // for retweet length

  const getRetweet = async () => {
    const id = tweet._id;
    try {
      const { data } = await axios.get(
        `http://localhost:8000/tweets/getretweet/${id}`
      );
      setTotalRetweet(data.totalRetweets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRetweet();
  }, []);
  // form comment

  const comment = async (id) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/tweets/comment/${id}`,
        { newComment }
      );

      toast.success("Comment Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // for comment length

  const getComment = async () => {
    try {
      const id = tweet._id;
      const { data } = await axios.get(
        `http://localhost:8000/tweets/getcomment/${id}`
      );

      setTotalComment(data.totalComments);
    } catch (error) {
      console.error("Error fetching product count:", error);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <>
      <div className={styles.divider} />

      {tweet ? (
        <div className={styles.tweet}>
          <img
            src={tweet.user.profilePicture}
            alt=""
            className={styles.profile}
          />
          <div className={styles.body}>
            <p className={styles.info}>
              <b>{tweet.user.name}</b> @{tweet.user.username} -{" "}
              {moment(tweet.createdAt).format("MMM D")}
            </p>
            <p className={styles.text}>{tweet.text}</p>
            {tweet.image && <img src={tweet.image} alt="" />}

            <div className={styles.actions}>
              <div className={styles.action}>
                <button
                  type="button"
                  className="border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal1"
                >
                  <ChatBubbleOutline />
                  <span>{totalComment}</span>
                </button>
                <div
                  className="modal fade"
                  id="exampleModal1"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Write Your Comment?
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <input
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          type="text"
                          className="form-control p-3 border-0"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Write the Comment"
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={() => comment(tweet._id)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.action} ${likeCheck() && styles.like}`}>
                {likeCheck() ? (
                  <Favorite onClick={() => likeTweet()} />
                ) : (
                  <FavoriteBorder onClick={() => likeTweet()} />
                )}
                <span>{tweet.likes.length}</span>
              </div>

              <div className={styles.action}>
                <button
                  type="button"
                  className="border-0"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <TransformOutlined />

                  <span>{totalRetweet}</span>
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Write tweet?
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <input
                          value={replayTweet}
                          onChange={(e) => setRplayTweet(e.target.value)}
                          type="text"
                          className="form-control p-3 border-0"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Write the tweet"
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={() => retweet(tweet._id)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.action}>
                <DeleteIcon onClick={() => handleDelete(tweet._id)} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
