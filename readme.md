### Fresh foucus media assessment

Author: Feike Li

Runtime environment: PHP 7.3.21/ Apache 2.4.46/ Mysql 5.7.31

IDE:

Testing Result: 100% 
    - [testing screenshots]()
    - tested browers: Chrome,Firefox,IE,Edge

How to Run:
- Mysql name: 'root' password: ''(default)
- Import inventory.sql into PHPMYADMIN
- localhost in the browser

Important Explaination:
- Appearance: nice to have a better UI, but follow the exact same ui as screenshot for demonstration purpose.
- Category only can be selected when customer name and pricing type not null.
- customer is harded coded, cause only 1 table is required in the code review doc.
- when product quantity is not enough, need to re-enter the quantity.
- Only location with enough products will be displayed in the select menu while purchasing.
- cause this app should be generally used by multiple provinces, I set up to input the tax manually.
- ship date would be always later than purchase date, I set the ship date 5 days after the current date.
- Submit only available after all required fileds not null
