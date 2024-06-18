
<div class="position">
  <div class='runner-type'>
    <div class='runner-type-title'>ENVIRON CTR</div>
    *************************** <br />-
    &nbsp;&nbsp;###################&nbsp;&nbsp; - <br /> -
    &nbsp;&nbsp;###################&nbsp;&nbsp; - <br /> -
    &nbsp;&nbsp;###################&nbsp;&nbsp; - <br /> -
    &nbsp;&nbsp;92886599 <span class='spinner'>|</span> 95654085&nbsp;&nbsp; - <br /> -
    &nbsp;&nbsp;###################&nbsp;&nbsp; - <br /> -
    &nbsp;&nbsp;###################&nbsp;&nbsp; - <br /> -
    &nbsp;&nbsp;###################&nbsp;&nbsp; - <br /> -
    &nbsp;&nbsp;###################&nbsp;&nbsp; - <br />
    ***************************
    <div class='runner-type-title'>
      24556&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DR&nbsp;&nbsp;&nbsp; 5
    </div>
    &nbsp;
  </div>
</div>


<style>
  .position {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 108%;
    transform: scale(1.0);
  }

  @media (max-width: 480px) {
    .position {
      margin-top: 10vh;
      height: 100%;
    }
  }
  .runner-type {
    font-family: 'Rubik Mono One', Courier, monospace;
    font-weight: 400;
    font-size: 2.4vmin;
    text-align: center;
    color: #8fe6e2;
    text-shadow: 0px 0px 9.12281px rgba(73, 193, 188, 0.8),
      0px 0px 54.7368px #49c1bc;
    filter: blur(0.07em);
    display: inline-block;
  }

  .runner-type-title {
    font-family: 'Rubik', Arial, Helvetica, sans-serif;
    font-size: 6.8vmin;
    font-weight: 900;
  }

  .spinner {
    display: inline-block;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>