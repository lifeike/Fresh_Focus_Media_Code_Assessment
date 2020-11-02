### Fresh foucus media assessment

Author: Feike Li

Runtime environment:Wampserver3.23/ PHP 7.3.21/ Apache 2.4.46/ Mysql 5.7.31

Testing Result: 100% 
- [testing results screenshots](https://github.com/lifeike/Fresh_Focus_Media_Code_Assessment/tree/master/screenshots) click here quick review
- tested browers: Chrome,Firefox,IE,Edge

How to Run:
- Mysql name: 'root' password: '' (default/null)
- Import inventory.sql into PHPMYADMIN
- localhost in the browser

Important Explaination:
- Appearance: nice to have a better UI, but follow the exact same ui as screenshot for demonstration purpose.
- Category only can be selected when customer name and pricing type not null.
- Customer is hard coded, cause only 1 table is required in the code review doc.
- When product quantity is not enough, need to re-enter the quantity.
- Only location with enough products will be displayed in the select menu while purchasing.
- Cause this app should be generally used by multiple provinces, I set up to input the tax manually.
- Ship date would be always later than purchase date, I set the ship date 5 days after the current date.
- Submit only available after all required fileds not null
