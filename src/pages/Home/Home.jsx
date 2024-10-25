import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="h1">Personal Information</h1>
      <div className="content-wrapper">
        <img src="public/รูปป.jpg" className="img1" alt="Profile" />
        <div className="p1">
          <p>Name : Kanokporn Chaiyakhao</p>
          <p>Age : 20 </p>
          <p>Nickname : Cream </p>
          <p>Hobbies : Likes listening to music, watching movies</p>
          <p>Contact: kanokporn.chy@spumail.net</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
