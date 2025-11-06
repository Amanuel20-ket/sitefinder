/* Clean, modular rewrite of script.js
   Preserves: dynamic page injection, hash routing, sidebar generation, menu toggle,
   and card equalization (height matching per .site-row). */

(function () {
  'use strict';

  // DOM refs (graceful fallbacks)
  const content = document.getElementById('content') || document.querySelector('.main-content');
  const sidebar = document.querySelector('.sidebar');

  // Pages content (kept as HTML strings for simple injection)
  const pages = {
    home: `
      <h1>Welcome to Site Finder</h1>
      <p>Discover curated websites across popular categories.</p>

      <section class="site-section">
        <h2>Browse Categories</h2>
        <div class="site-row">
          <div class="site-card">
            <div class="site-card-container">
              <img class="site-logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%230066ff'/%3E%3Ctext x='50' y='58' font-size='48' text-anchor='middle' fill='%23fff' font-family='Arial'%3EN%3C/text%3E%3C/svg%3E" alt="News category">
              <div class="site-card-content"><h3>News</h3><p>Stay informed with trusted news sources.</p></div>
              <div class="site-card-action"><a href="news.html">Explore</a></div>
            </div>
          </div>

          <div class="site-card">
            <div class="site-card-container">
              <img class="site-logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%230066ff'/%3E%3Ctext x='50' y='58' font-size='48' text-anchor='middle' fill='%23fff' font-family='Arial'%3EE%3C/text%3E%3C/svg%3E" alt="Education category">
              <div class="site-card-content"><h3>Education</h3><p>Learn from top educational platforms.</p></div>
              <div class="site-card-action"><a href="education.html">Explore</a></div>
            </div>
          </div>

          <div class="site-card">
            <div class="site-card-container">
              <img class="site-logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%230066ff'/%3E%3Ctext x='50' y='58' font-size='48' text-anchor='middle' fill='%23fff' font-family='Arial'%3ET%3C/text%3E%3C/svg%3E" alt="Technology category">
              <div class="site-card-content"><h3>Technology</h3><p>Explore tech news and resources.</p></div>
              <div class="site-card-action"><a href="technology.html">Explore</a></div>
            </div>
          </div>
        
          <div class="site-card">
            <div class="site-card-container">
              <img class="site-logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%230066ff'/%3E%3Ctext x='50' y='58' font-size='48' text-anchor='middle' fill='%23fff' font-family='Arial'%3EE%3C/text%3E%3C/svg%3E" alt="Entertainment category">
              <div class="site-card-content"><h3>Entertainment</h3><p>Find streaming and media content.</p></div>
              <div class="site-card-action"><a href="entertainment.html">Explore</a></div>
            </div>
          </div>

          <div class="site-card">
            <div class="site-card-container">
              <img class="site-logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%230066ff'/%3E%3Ctext x='50' y='58' font-size='48' text-anchor='middle' fill='%23fff' font-family='Arial'%3ES%3C/text%3E%3C/svg%3E" alt="Sports category">
              <div class="site-card-content"><h3>Sports</h3><p>Get latest sports updates and news.</p></div>
              <div class="site-card-action"><a href="sports.html">Explore</a></div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section class="about">
        <h2>About Site Finder</h2>
        <p>Site Finder curates useful websites across popular categories so you can quickly discover reliable resources for learning, news, entertainment, technology and more.</p>
        <ul class="features-list">
          <li>Curated lists of reputable websites by category</li>
          <li>Short descriptions to help you decide quickly</li>
          <li>Mobile-friendly layout and fast navigation</li>
          <li>Regular updates with new resources</li>
        </ul>
      </section>
      <div class="ad-slot" id="ad-top">Advertisement — your ad will display here</div>
    `,

    // other pages (news, education, technology, entertainment, sports)
    // Keep the same HTML snippets that were previously present to avoid losing content
    news: `
    <h1>News Websites</h1>
    <section class="site-section">
      <h2>Premium News Sites</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/wsj.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=wsj.com&sz=128'" alt="WSJ logo">
            <div class="site-card-content"><h3>The Wall Street Journal</h3><p>Premium business and financial news.</p></div>
            <div class="site-card-action"><a href="https://www.wsj.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/ft.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=ft.com&sz=128'" alt="Financial Times logo">
            <div class="site-card-content"><h3>Financial Times</h3><p>Global business and economic coverage.</p></div>
            <div class="site-card-action"><a href="https://www.ft.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/nytimes.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=nytimes.com&sz=128'" alt="NY Times logo">
            <div class="site-card-content"><h3>The New York Times</h3><p>Award-winning global journalism.</p></div>
            <div class="site-card-action"><a href="https://www.nytimes.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/bloomberg.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=bloomberg.com&sz=128'" alt="Bloomberg logo">
            <div class="site-card-content"><h3>Bloomberg</h3><p>Global business and market news.</p></div>
            <div class="site-card-action"><a href="https://www.bloomberg.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>News & Analysis</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/theguardian.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=theguardian.com&sz=128'" alt="The Guardian logo">
            <div class="site-card-content"><h3>The Guardian Labs</h3><p>Innovative digital journalism.</p></div>
            <div class="site-card-action"><a href="https://www.theguardian.com/labs" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/theepochtimes.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=theepochtimes.com&sz=128'" alt="The Epoch Times logo">
            <div class="site-card-content"><h3>The Epoch Times</h3><p>Independent news and analysis.</p></div>
            <div class="site-card-action"><a href="https://www.theepochtimes.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/reuters.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=reuters.com&sz=128'" alt="Reuters logo">
            <div class="site-card-content"><h3>Reuters</h3><p>Breaking international news.</p></div>
            <div class="site-card-action"><a href="https://www.reuters.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/newsmax.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=newsmax.com&sz=128'" alt="Newsmax logo">
            <div class="site-card-content"><h3>Newsmax</h3><p>Conservative news coverage.</p></div>
            <div class="site-card-action"><a href="https://www.newsmax.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Digital News Platforms</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/pressreader.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=pressreader.com&sz=128'" alt="PressReader logo">
            <div class="site-card-content"><h3>PressReader</h3><p>Digital newspapers and magazines.</p></div>
            <div class="site-card-action"><a href="https://www.pressreader.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/newsbreak.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=newsbreak.com&sz=128'" alt="NewsBreak logo">
            <div class="site-card-content"><h3>NewsBreak</h3><p>Local and trending news app.</p></div>
            <div class="site-card-action"><a href="https://www.newsbreak.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/medium.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=medium.com&sz=128'" alt="Medium logo">
            <div class="site-card-content"><h3>Medium Partner Program</h3><p>Premium journalism platform.</p></div>
            <div class="site-card-action"><a href="https://medium.com/creators" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/flipboard.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=flipboard.com&sz=128'" alt="Flipboard logo">
            <div class="site-card-content"><h3>Flipboard</h3><p>Personalized news aggregator.</p></div>
            <div class="site-card-action"><a href="https://flipboard.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>
    `,

    education: `
    <h1>Education Websites</h1>
    <section class="site-section">
      <h2>University-Style Learning</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/coursera.org?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=coursera.org&sz=128'" alt="Coursera logo">
            <div class="site-card-content"><h3>Coursera</h3><p>Learn from top universities worldwide.</p></div>
            <div class="site-card-action"><a href="https://www.coursera.org" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/edx.org?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=edx.org&sz=128'" alt="edX logo">
            <div class="site-card-content"><h3>edX</h3><p>University courses and professional certificates.</p></div>
            <div class="site-card-action"><a href="https://www.edx.org" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/futurelearn.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=futurelearn.com&sz=128'" alt="FutureLearn logo">
            <div class="site-card-content"><h3>FutureLearn</h3><p>Online courses from leading institutions.</p></div>
            <div class="site-card-action"><a href="https://www.futurelearn.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/linkedin.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=linkedin.com&sz=128'" alt="LinkedIn Learning logo">
            <div class="site-card-content"><h3>LinkedIn Learning</h3><p>Professional development courses.</p></div>
            <div class="site-card-action"><a href="https://www.linkedin.com/learning" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Skill-Based Learning</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/udemy.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=udemy.com&sz=128'" alt="Udemy logo">
            <div class="site-card-content"><h3>Udemy</h3><p>Practical courses from industry experts.</p></div>
            <div class="site-card-action"><a href="https://www.udemy.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/skillshare.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=skillshare.com&sz=128'" alt="Skillshare logo">
            <div class="site-card-content"><h3>Skillshare</h3><p>Creative and practical skill courses.</p></div>
            <div class="site-card-action"><a href="https://www.skillshare.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/masterclass.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=masterclass.com&sz=128'" alt="MasterClass logo">
            <div class="site-card-content"><h3>MasterClass</h3><p>Learn from world-class instructors.</p></div>
            <div class="site-card-action"><a href="https://www.masterclass.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/creativelive.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=creativelive.com&sz=128'" alt="CreativeLive logo">
            <div class="site-card-content"><h3>CreativeLive</h3><p>Creative and business skills education.</p></div>
            <div class="site-card-action"><a href="https://www.creativelive.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Tech & Programming</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/codecademy.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=codecademy.com&sz=128'" alt="Codecademy logo">
            <div class="site-card-content"><h3>Codecademy</h3><p>Interactive programming courses.</p></div>
            <div class="site-card-action"><a href="https://www.codecademy.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/teachable.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=teachable.com&sz=128'" alt="Teachable logo">
            <div class="site-card-content"><h3>Teachable</h3><p>Platform for online course creators.</p></div>
            <div class="site-card-action"><a href="https://www.teachable.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/khanacademy.org?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=khanacademy.org&sz=128'" alt="Khan Academy logo">
            <div class="site-card-content"><h3>Khan Academy</h3><p>Free educational resources for everyone.</p></div>
            <div class="site-card-action"><a href="https://www.khanacademy.org" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/freecodecamp.org?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=freecodecamp.org&sz=128'" alt="freeCodeCamp logo">
            <div class="site-card-content"><h3>freeCodeCamp</h3><p>Free coding tutorials and certificates.</p></div>
            <div class="site-card-action"><a href="https://www.freecodecamp.org" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="site-section">
      <h2>Additional Platforms</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/khanacademy.org?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=khanacademy.org&sz=128'" alt="Khan Academy Kids logo">
            <div class="site-card-content"><h3>Khan Academy Kids+</h3><p>Free educational content for younger learners.</p></div>
            <div class="site-card-action"><a href="https://www.khanacademy.org" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/rosettastone.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=rosettastone.com&sz=128'" alt="Rosetta Stone logo">
            <div class="site-card-content"><h3>Rosetta Stone</h3><p>Language learning focused on immersion.</p></div>
            <div class="site-card-action"><a href="https://www.rosettastone.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/babbel.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=babbel.com&sz=128'" alt="Babbel logo">
            <div class="site-card-content"><h3>Babbel</h3><p>Practical courses for real conversations.</p></div>
            <div class="site-card-action"><a href="https://www.babbel.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/preply.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=preply.com&sz=128'" alt="Preply logo">
            <div class="site-card-content"><h3>Preply</h3><p>Find tutors for language and subject learning.</p></div>
            <div class="site-card-action"><a href="https://www.preply.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>

      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/chegg.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=chegg.com&sz=128'" alt="Chegg logo">
            <div class="site-card-content"><h3>Chegg</h3><p>Study help, textbook solutions and tutoring.</p></div>
            <div class="site-card-action"><a href="https://www.chegg.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/brilliant.org?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=brilliant.org&sz=128'" alt="Brilliant logo">
            <div class="site-card-content"><h3>Brilliant</h3><p>Interactive problem-solving and math courses.</p></div>
            <div class="site-card-action"><a href="https://www.brilliant.org" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/treehouse.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=treehouse.com&sz=128'" alt="Treehouse logo">
            <div class="site-card-content"><h3>Treehouse</h3><p>Beginner-friendly developer courses and tracks.</p></div>
            <div class="site-card-action"><a href="https://teamtreehouse.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/pluralsight.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=pluralsight.com&sz=128'" alt="Pluralsight logo">
            <div class="site-card-content"><h3>Pluralsight</h3><p>Skill development for technologists and teams.</p></div>
            <div class="site-card-action"><a href="https://www.pluralsight.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>

      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/alison.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=alison.com&sz=128'" alt="Alison logo">
            <div class="site-card-content"><h3>Alison</h3><p>Free online courses and certificate programs.</p></div>
            <div class="site-card-action"><a href="https://alison.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/wondrium.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=wondrium.com&sz=128'" alt="Wondrium logo">
            <div class="site-card-content"><h3>Wondrium</h3><p>Documentary-style courses, lectures and series.</p></div>
            <div class="site-card-action"><a href="https://www.wondrium.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>
    `,

    technology: `
    <h1>Technology Websites</h1>
    <section class="site-section">
      <h2>Major Tech Companies</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/microsoft.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=microsoft.com&sz=128'" alt="Microsoft logo">
            <div class="site-card-content"><h3>Microsoft</h3><p>Windows, Office 365, and cloud services.</p></div>
            <div class="site-card-action"><a href="https://www.microsoft.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/apple.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=apple.com&sz=128'" alt="Apple logo">
            <div class="site-card-content"><h3>Apple Services</h3><p>iCloud, App Store, and Apple ecosystem.</p></div>
            <div class="site-card-action"><a href="https://www.apple.com/services" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/adobe.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=adobe.com&sz=128'" alt="Adobe logo">
            <div class="site-card-content"><h3>Adobe</h3><p>Creative and document cloud solutions.</p></div>
            <div class="site-card-action"><a href="https://www.adobe.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/norton.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=norton.com&sz=128'" alt="Norton logo">
            <div class="site-card-content"><h3>Norton</h3><p>Security and antivirus solutions.</p></div>
            <div class="site-card-action"><a href="https://www.norton.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Computer Manufacturers</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/lenovo.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=lenovo.com&sz=128'" alt="Lenovo logo">
            <div class="site-card-content"><h3>Lenovo</h3><p>Laptops, desktops, and workstations.</p></div>
            <div class="site-card-action"><a href="https://www.lenovo.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/dell.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=dell.com&sz=128'" alt="Dell logo">
            <div class="site-card-content"><h3>Dell</h3><p>Business and consumer computing solutions.</p></div>
            <div class="site-card-action"><a href="https://www.dell.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/hp.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=hp.com&sz=128'" alt="HP logo">
            <div class="site-card-content"><h3>HP</h3><p>Computers, printers, and enterprise solutions.</p></div>
            <div class="site-card-action"><a href="https://www.hp.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/asus.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=asus.com&sz=128'" alt="ASUS logo">
            <div class="site-card-content"><h3>ASUS</h3><p>Gaming and consumer electronics.</p></div>
            <div class="site-card-action"><a href="https://www.asus.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Tech Retail & News</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/newegg.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=newegg.com&sz=128'" alt="Newegg logo">
            <div class="site-card-content"><h3>Newegg</h3><p>Computer parts and electronics retailer.</p></div>
            <div class="site-card-action"><a href="https://www.newegg.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/bestbuy.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=bestbuy.com&sz=128'" alt="Best Buy logo">
            <div class="site-card-content"><h3>Best Buy</h3><p>Consumer electronics and appliances.</p></div>
            <div class="site-card-action"><a href="https://www.bestbuy.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/techradar.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=techradar.com&sz=128'" alt="TechRadar logo">
            <div class="site-card-content"><h3>TechRadar</h3><p>Tech news, reviews, and buying guides.</p></div>
            <div class="site-card-action"><a href="https://www.techradar.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/theverge.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=theverge.com&sz=128'" alt="The Verge logo">
            <div class="site-card-content"><h3>The Verge</h3><p>Technology news and product reviews.</p></div>
            <div class="site-card-action"><a href="https://www.theverge.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>
    </section>

    <section class="site-section">
      <h2>Devices & Components</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/amazon.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=amazon.com&sz=128'" alt="Amazon Devices logo">
            <div class="site-card-content"><h3>Amazon Devices</h3><p>Echo, Fire TV and Kindle devices.</p></div>
            <div class="site-card-action"><a href="https://www.amazon.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/samsung.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=samsung.com&sz=128'" alt="Samsung logo">
            <div class="site-card-content"><h3>Samsung</h3><p>Smartphones, TVs and consumer electronics.</p></div>
            <div class="site-card-action"><a href="https://www.samsung.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/logitech.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=logitech.com&sz=128'" alt="Logitech logo">
            <div class="site-card-content"><h3>Logitech</h3><p>Peripherals: mice, keyboards, webcams and audio.</p></div>
            <div class="site-card-action"><a href="https://www.logitech.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/gopro.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=gopro.com&sz=128'" alt="GoPro logo">
            <div class="site-card-content"><h3>GoPro</h3><p>Action cameras and accessories.</p></div>
            <div class="site-card-action"><a href="https://gopro.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>

      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/intel.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=intel.com&sz=128'" alt="Intel logo">
            <div class="site-card-content"><h3>Intel</h3><p>Processors, chipsets and platform technologies.</p></div>
            <div class="site-card-action"><a href="https://www.intel.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/nvidia.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=nvidia.com&sz=128'" alt="NVIDIA logo">
            <div class="site-card-content"><h3>NVIDIA</h3><p>Graphics cards, AI and compute platforms.</p></div>
            <div class="site-card-action"><a href="https://www.nvidia.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/acer.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=acer.com&sz=128'" alt="Acer logo">
            <div class="site-card-content"><h3>Acer</h3><p>Laptops, monitors and gaming hardware.</p></div>
            <div class="site-card-action"><a href="https://www.acer.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/hostgator.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=hostgator.com&sz=128'" alt="HostGator logo">
            <div class="site-card-content"><h3>HostGator</h3><p>Web hosting and domain services.</p></div>
            <div class="site-card-action"><a href="https://www.hostgator.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Web Hosting & Services</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/bluehost.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=bluehost.com&sz=128'" alt="Bluehost logo">
            <div class="site-card-content"><h3>Bluehost</h3><p>Shared hosting, WordPress and domain services.</p></div>
            <div class="site-card-action"><a href="https://www.bluehost.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/hostgator.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=hostgator.com&sz=128'" alt="HostGator logo">
            <div class="site-card-content"><h3>HostGator</h3><p>Reliable web hosting and site management tools.</p></div>
            <div class="site-card-action"><a href="https://www.hostgator.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>
    `,

    entertainment: `
    <h1>Entertainment Websites</h1>
    <section class="site-section">
      <h2>Premium Streaming Services</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/netflix.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=netflix.com&sz=128'" alt="Netflix logo">
            <div class="site-card-content"><h3>Netflix</h3><p>Premium streaming movies and TV shows.</p></div>
            <div class="site-card-action"><a href="https://www.netflix.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/primevideo.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=primevideo.com&sz=128'" alt="Prime Video logo">
            <div class="site-card-content"><h3>Prime Video</h3><p>Amazon's streaming service with original content.</p></div>
            <div class="site-card-action"><a href="https://www.primevideo.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/disneyplus.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=disneyplus.com&sz=128'" alt="Disney+ logo">
            <div class="site-card-content"><h3>Disney+</h3><p>Disney, Marvel, Star Wars streaming.</p></div>
            <div class="site-card-action"><a href="https://www.disneyplus.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/hbomax.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=hbomax.com&sz=128'" alt="HBO Max logo">
            <div class="site-card-content"><h3>HBO Max</h3><p>Premium streaming entertainment.</p></div>
            <div class="site-card-action"><a href="https://www.hbomax.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Media Management & Audio</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/plex.tv?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=plex.tv&sz=128'" alt="Plex logo">
            <div class="site-card-content"><h3>Plex</h3><p>Stream and organize your media library.</p></div>
            <div class="site-card-action"><a href="https://www.plex.tv" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/spotify.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=spotify.com&sz=128'" alt="Spotify logo">
            <div class="site-card-content"><h3>Spotify</h3><p>Music and podcast streaming platform.</p></div>
            <div class="site-card-action"><a href="https://www.spotify.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/audible.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=audible.com&sz=128'" alt="Audible logo">
            <div class="site-card-content"><h3>Audible</h3><p>Premium audiobooks and podcasts.</p></div>
            <div class="site-card-action"><a href="https://www.audible.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/rifftrax.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=rifftrax.com&sz=128'" alt="RiffTrax logo">
            <div class="site-card-content"><h3>RiffTrax</h3><p>Comedy commentary for movies.</p></div>
            <div class="site-card-action"><a href="https://www.rifftrax.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Tickets & Events</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/fandango.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=fandango.com&sz=128'" alt="Fandango logo">
            <div class="site-card-content"><h3>Fandango</h3><p>Movie tickets and showtimes.</p></div>
            <div class="site-card-action"><a href="https://www.fandango.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/tiqets.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=tiqets.com&sz=128'" alt="Tiqets logo">
            <div class="site-card-content"><h3>Tiqets</h3><p>Tickets for attractions worldwide.</p></div>
            <div class="site-card-action"><a href="https://www.tiqets.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/ticketmaster.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=ticketmaster.com&sz=128'" alt="Ticketmaster logo">
            <div class="site-card-content"><h3>Ticketmaster</h3><p>Concert and event tickets.</p></div>
            <div class="site-card-action"><a href="https://www.ticketmaster.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/stubhub.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=stubhub.com&sz=128'" alt="StubHub logo">
            <div class="site-card-content"><h3>StubHub</h3><p>Event tickets marketplace.</p></div>
            <div class="site-card-action"><a href="https://www.stubhub.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Information & Reviews</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/imdb.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=imdb.com&sz=128'" alt="IMDb logo">
            <div class="site-card-content"><h3>IMDb</h3><p>Movies, TV, and celebrity database.</p></div>
            <div class="site-card-action"><a href="https://www.imdb.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/rottentomatoes.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=rottentomatoes.com&sz=128'" alt="Rotten Tomatoes logo">
            <div class="site-card-content"><h3>Rotten Tomatoes</h3><p>Movie and TV reviews.</p></div>
            <div class="site-card-action"><a href="https://www.rottentomatoes.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/metacritic.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=metacritic.com&sz=128'" alt="Metacritic logo">
            <div class="site-card-content"><h3>Metacritic</h3><p>Reviews and ratings aggregator.</p></div>
            <div class="site-card-action"><a href="https://www.metacritic.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/letterboxd.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=letterboxd.com&sz=128'" alt="Letterboxd logo">
            <div class="site-card-content"><h3>Letterboxd</h3><p>Social movie tracking and reviews.</p></div>
            <div class="site-card-action"><a href="https://www.letterboxd.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>
    `,

    sports: `
    <h1>Sports Websites</h1>
    <section class="site-section">
      <h2>Live Sports & Coverage</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/sportsline.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=sportsline.com&sz=128'" alt="SportsLine logo">
            <div class="site-card-content"><h3>SportsLine</h3><p>Expert sports analysis and predictions.</p></div>
            <div class="site-card-action"><a href="https://www.sportsline.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/espn.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=espn.com&sz=128'" alt="ESPN+ logo">
            <div class="site-card-content"><h3>ESPN+</h3><p>Premium sports streaming and exclusive content.</p></div>
            <div class="site-card-action"><a href="https://plus.espn.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/fubotv.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=fubotv.com&sz=128'" alt="FuboTV logo">
            <div class="site-card-content"><h3>FuboTV</h3><p>Live sports streaming platform.</p></div>
            <div class="site-card-action"><a href="https://www.fubo.tv" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/skysports.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=skysports.com&sz=128'" alt="Sky Sports logo">
            <div class="site-card-content"><h3>Sky Sports</h3><p>Premium sports coverage and live events.</p></div>
            <div class="site-card-action"><a href="https://www.skysports.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/draftkings.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=draftkings.com&sz=128'" alt="DraftKings logo">
            <div class="site-card-content"><h3>DraftKings</h3><p>Sports betting and daily fantasy sports.</p></div>
            <div class="site-card-action"><a href="https://www.draftkings.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Sports Apparel & Equipment</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/nike.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=nike.com&sz=128'" alt="Nike logo">
            <div class="site-card-content"><h3>Nike</h3><p>Premium sports gear and apparel.</p></div>
            <div class="site-card-action"><a href="https://www.nike.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/adidas.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=adidas.com&sz=128'" alt="Adidas logo">
            <div class="site-card-content"><h3>Adidas</h3><p>Sports footwear and accessories.</p></div>
            <div class="site-card-action"><a href="https://www.adidas.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/underarmour.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=underarmour.com&sz=128'" alt="Under Armour logo">
            <div class="site-card-content"><h3>Under Armour</h3><p>Performance sports apparel.</p></div>
            <div class="site-card-action"><a href="https://www.underarmour.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/reebok.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=reebok.com&sz=128'" alt="Reebok logo">
            <div class="site-card-content"><h3>Reebok</h3><p>Athletic footwear and sportswear.</p></div>
            <div class="site-card-action"><a href="https://www.reebok.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-section">
      <h2>Sports Shopping & Tickets</h2>
      <div class="site-row">
        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/fanatics.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=fanatics.com&sz=128'" alt="Fanatics logo">
            <div class="site-card-content"><h3>Fanatics</h3><p>Official sports merchandise and jerseys.</p></div>
            <div class="site-card-action"><a href="https://www.fanatics.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/decathlon.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=decathlon.com&sz=128'" alt="Decathlon logo">
            <div class="site-card-content"><h3>Decathlon</h3><p>Affordable sports gear and equipment.</p></div>
            <div class="site-card-action"><a href="https://www.decathlon.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/tiqets.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=tiqets.com&sz=128'" alt="Tiqets logo">
            <div class="site-card-content"><h3>Tiqets</h3><p>Sports events and attraction tickets.</p></div>
            <div class="site-card-action"><a href="https://www.tiqets.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>

        <div class="site-card">
          <div class="site-card-container">
            <img class="site-logo" loading="lazy" src="https://logo.clearbit.com/stubhub.com?size=200" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=stubhub.com&sz=128'" alt="StubHub logo">
            <div class="site-card-content"><h3>StubHub</h3><p>Sports tickets marketplace.</p></div>
            <div class="site-card-action"><a href="https://www.stubhub.com" target="_blank" rel="noopener">Visit</a></div>
          </div>
        </div>
      </div>
    </section>
    `
  };

  /* ----------------- Utility helpers ----------------- */
  function safeQuery(selector, root = document) {
    try { return root.querySelector(selector); } catch (e) { return null; }
  }

  function debounce(fn, wait = 120) {
    let t = null;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /* ----------------- Sidebar generation ----------------- */
  function buildSidebar() {
    if (!sidebar) return;
    const heading = sidebar.querySelector('h2');
    sidebar.innerHTML = '';
    if (heading) sidebar.appendChild(heading);

    Object.keys(pages).forEach(slug => {
      const a = document.createElement('a');
      a.href = `#${slug}`;
      a.textContent = slug === 'home' ? 'Home' : slug[0].toUpperCase() + slug.slice(1);
      a.dataset.slug = slug;
      a.addEventListener('click', onSidebarLink);
      sidebar.appendChild(a);
    });
  }

  function onSidebarLink(e) {
    // internal navigation only
    if (this && this.dataset && this.dataset.slug) {
      e.preventDefault();
      const slug = this.dataset.slug;
      history.pushState(null, '', `#${slug}`);
      loadPage(slug);

      // Close sidebar on mobile
      const sb = document.querySelector('.sidebar');
      if (window.innerWidth < 768 && sb) sb.classList.remove('open');
    }
  }

  /* ----------------- Page loader + transitions ----------------- */
  function setActiveSidebarLink(slug) {
    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => link.classList.toggle('active', link.dataset.slug === slug));
  }

  function attachHomeCategoryHandlers(root) {
    if (!root) return;
    const categoryLinks = root.querySelectorAll('.site-card-action a');
    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (!href) return;
        const category = href.replace('.html', '');
        history.pushState(null, '', `#${category}`);
        loadPage(category);
      });
    });
  }

  function loadPage(page) {
    const slug = page || 'home';
    setActiveSidebarLink(slug);
    if (!content) return;

    // Fade out -> replace -> fade in
    content.style.transition = 'opacity 0.28s ease';
    content.style.opacity = '0';

    setTimeout(() => {
      content.innerHTML = pages[slug] || pages.home;

      // Attach category handlers if on home
      if (slug === 'home') attachHomeCategoryHandlers(content);

      // After DOM insertion, watch images and equalize
      watchImagesForEqualize(content);
      scheduleEqualize();

      // Smooth scroll to top and reveal
      window.scrollTo({ top: 0, behavior: 'smooth' });
      content.style.opacity = '1';
    }, 300);
  }

  // Handle back/forward navigation
  window.addEventListener('hashchange', () => {
    const page = location.hash.replace('#', '') || 'home';
    loadPage(page);
  });

  /* ----------------- Menu toggle ----------------- */
  function initMenuToggle() {
    const sb = document.querySelector('.sidebar');
    if (!sb) return;

    // Direct click handler on the button (preferred). Stop propagation
    // so delegated handler doesn't run twice.
    const btn = document.getElementById('menu-btn');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const opened = sb.classList.toggle('open');
        try { btn.setAttribute('aria-expanded', opened ? 'true' : 'false'); } catch (err) {}
      });
    }

    // Delegated fallback: handles outside-click to close the sidebar on small screens
    document.addEventListener('click', (e) => {
      // If sidebar is open on small screens and user clicked outside, close it.
      if (window.innerWidth >= 768) return;
      if (!sb.classList.contains('open')) return;
      if (!sb.contains(e.target)) {
        sb.classList.remove('open');
        if (btn) try { btn.setAttribute('aria-expanded', 'false'); } catch (err) {}
      }
    });
  }

  /* ----------------- Card equalization ----------------- */
  function equalizeSiteRows() {
    const rows = document.querySelectorAll('.site-row');
    rows.forEach(row => {
      const cards = Array.from(row.querySelectorAll('.site-card'));
      if (!cards.length) return;
      // Reset heights for accurate measurement
      cards.forEach(c => c.style.height = '');
      const heights = cards.map(c => Math.ceil(c.getBoundingClientRect().height));
      const max = Math.max(...heights, 0);
      if (max > 0) cards.forEach(c => c.style.height = max + 'px');
    });
  }

  const scheduleEqualize = debounce(() => {
    equalizeSiteRows();
    setTimeout(equalizeSiteRows, 260);
  }, 140);

  function watchImagesForEqualize(root = document) {
    const imgs = Array.from(root.querySelectorAll('.site-card img'));
    if (!imgs.length) {
      // ensure equalize runs even if no images
      scheduleEqualize();
      return;
    }
    let remaining = imgs.length;
    const done = () => { remaining -= 1; if (remaining <= 0) scheduleEqualize(); };
    imgs.forEach(img => {
      if (img.complete) { done(); return; }
      img.addEventListener('load', done);
      img.addEventListener('error', done);
    });
    // Fallback in case load/error don't fire
    setTimeout(scheduleEqualize, 700);
  }

  // Re-run on resize
  window.addEventListener('resize', debounce(equalizeSiteRows, 160));

  /* ----------------- Init ----------------- */
  document.addEventListener('DOMContentLoaded', () => {
    buildSidebar();
    initMenuToggle();

    // Load initial route
    const page = location.hash.replace('#', '') || 'home';
    loadPage(page);
  });

})();


// script.js

// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn');
  const sidebar = document.querySelector('.sidebar');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Optional: Close sidebar when a link is clicked (for small screens)
  const links = document.querySelectorAll('.sidebar a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900 && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  });
});



