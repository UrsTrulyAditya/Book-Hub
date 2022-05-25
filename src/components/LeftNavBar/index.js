.bookshelves-list-item {
    display: flex;
  }
  
  @media screen and (max-width: 767px) {
    .bookshelves-list-item {
      margin-right: 10px;
    }
  }
  
  .list-item-button-mobile {
    border: #0284c7 solid 1px;
    border-radius: 12px;
    color: #000000;
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 400;
    padding: 4px 8px;
    cursor: pointer;
    margin-bottom: 12px;
    margin-right: 2px;
  }
  
  @media screen and (min-width: 768px) {
    .list-item-button-mobile {
      border: none;
      background-color: transparent;
      outline: none;
      padding: 0px;
      width: 150px;
      text-align: start;
      font-weight: 600;
    }
  }
  
  .selected-status {
    color: #ffffff;
    background-color: #0284c7;
  }
  @media screen and (min-width: 768px) {
    .selected-status {
      color: #0284c7;
      background-color: transparent;
    }
  }
  