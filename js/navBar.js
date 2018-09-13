"use strict"

let {
  Router,
      Route,
      IndexRoute,
      IndexLink,
      Link
} = ReactRouter;

let Contact = React.createClass({
  render: function() {
      return (
        <div>
          <h1> Andrew Facchiano </h1>
          <div>
            <a href="mailto:andrewfacchiano@gmail.com" >
              <img src="images/contact_icons/email.png" className="contactNode"></img><p> By E-mail at andrewfacchiano@gmail.com </p>
            </a>
          </div>

          <div>
            <a href="https://www.google.com/maps/place/1253+41st+Ave,+San+Francisco,+CA+94122/@37.763386,-122.5029622,17z/data=!3m1!4b1!4m2!3m1!1s0x80858799abea6959:0x20d865f910afe03d" >
              <img src="images/contact_icons/home.png" className="contactNode"></img><p> In person at 1253 41st Avenue in San Francisco </p>
            </a>
          </div>

          <div>
            <a href="https://www.linkedin.com/in/andrew-facchiano-0961a761">
              <img src="images/contact_icons/linkedin.png" className="contactNode"></img><p> On Linkdin </p>
            </a>
          </div>
      </div>
      );
    }
});

let About = React.createClass({
  render: function() {
      return (
        <div>
          <ul>
            <li className="aboutMe">
              Andrew (Drew) is a studied software developer currently living in the Bay Area. He enjoys long walks in the park, riding bikes and working song lyrics
              into conversations. He has worked on corporate software, websites and video games. He enjoys teaching and learning new skills.
            </li>
        </ul>
      </div>
      );
    }
});

let Projects = React.createClass({
  render: function() {
      return (
        <div>
           <ul>
               <li className="project"><a href="audioInvaders/index.html"><h1>Audio Invaders</h1></a></li>
               <li className="project"><a href="https://berkyland.wordpress.com/author/berkyland/"><h1>Berkyland Blog (old)</h1></a></li>
               <li className="project"><a href="http://www.lensthegame.com/"><h1>Lens</h1></a></li>
               <li className="project"><a href="http://www.adventuretimegamejam.com/submissions/62-the-pit-of-the-ice-king"><h1>Pit of The Ice King</h1></a></li>
               <li className="project"><a href="js/datcat/GGJ_Builds.html"><h1>Dat Cat</h1></a></li>
               <li className="project"><a href="https://nitwic.podbean.com"><h1>Nitwic!</h1></a></li>
         </ul>
        </div>
      );
    }
});

let WelcomeText = React.createClass({
  render: function() {
      return (
        <div>
          <h1> Hello stranger! </h1>
        </div>
      );
    }
});


let Blog = React.createClass ({
  render: function() {
    //create blog entries from json file. Note each entries text is formatted in similar away to emtry.
    let blogEntries = blogData.postsArray.map(entry =>
    <li className="blogEntry">
      <div className="blogTitle">{entry.postTitle}</div>
      <br></br>
      {
        entry.postText.map(line =>
          <div className="blogText"> { line }
          <br></br>
          <br></br>
          </div> )
      }
    </li>
  );

    return (
      <div>
        <ul>
          {blogEntries}
        </ul>
      </div>
    );
  }
});

let Menu = React.createClass({
    render: function() {
        return (
          <div>
                <ul className = "header" >
                    <IndexLink activeClassName="active" to="/"><li> Home </li></IndexLink>
                    <Link activeClassName="active" to="/Blog"><li> Blog </li></Link>
                    <Link activeClassName="active" to="/Projects"><li> Projects </li></Link>
                    <Link activeClassName="active" to="/About"><li> About </li></Link>
                    <Link activeClassName="active" to="/contact"><li> Contact </li></Link>
                </ul>
                <div className="content">
                {this.props.children}
                </div>
          </div>
        );
    }
});

ReactDOM.render(
    <Router>
        <Route path = "/" component={ Menu }>
        <IndexRoute component={ WelcomeText }/>
        <Route path = "Blog" component={ Blog } />
        <Route path = "Projects" component={ Projects } />
        <Route path = "About" component={ About } />
        <Route path = "contact" component={ Contact } />
        </Route>
    </Router>,
    document.getElementById('container')
);
