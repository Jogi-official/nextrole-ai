import styles from "./navbar.module.css";

function Profile() {
  return (
    <div className={`${styles.profile}`}>
      <a href="">
        <img src="./avatar2.svg" alt="avatar" height="60" width="60" />
      </a>
    </div>
  );
}

export default Profile;
