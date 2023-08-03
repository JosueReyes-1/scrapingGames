const express = require("express");
const puppeteer = require('puppeteer')
const app = express();
const port = 3000;



app.get("/getItems", async (req, res) => {
    const browser=await puppeteer.launch({
        headless:false
    })
    const page = await browser.newPage()

    await page.goto('https://quotes.toscrape.com')

    const result=await page.evaluate(()=>{
        const quotes=document.querySelectorAll(".quote")
        const data=[...quotes].map((quote)=>{
            const quoteText=quote.querySelector(".text").innerText;
            const author=quote.querySelector(".author").innerText;
            const tags =[...quote.querySelectorAll(".tag")].map((tag)=>tag.innerText);
            return {
                quoteText,
                author,
                tags
            }
        })
        return data
    })
    console.log(result);
    await browser.close()
    res.json({result:result})
});

app.listen(port);
