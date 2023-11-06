const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:5500/';

const mockedData = {
    catalog: [{ author: 'Author 1', 'title': 'Title 1', _id: "1001" }],
    //catalog: [{author: 'Author 2', 'title': 'Title 2', _id: "1002"}],
}

//Test Suite
describe('Tests', async function () {
    this.timeout(5000);
    let browser, page;

    before(async () => { // извиква се преди всички тестове 
        browser = await chromium.launch();// трябва 1 път да го инициализираме затова го слагаме в before
    });

    after(async () => {  // извикват се след тестовете
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();// в браузъра отваряме нова страница
    }); // преди всеки тест

    afterEach(async () => {
        page.close(); //да си почистим и да си затворим страницата
    })

    it("it works", async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        expect(1).to.equal(1);
    });
    it('screenshot', async () => { // да направим скрийншот, когато отворим нашето шриложение
        await page.goto(host);

        await page.screenshot({ path: "screenshot.png" });
    });

    it('loads all books', async () => {
        await page.goto(host); //първо да си заредим нашето приложение
        await page.waitForSelector('#loadBooks');
        await page.route('**/jsonstore/collections/books', (route, request) => { // на страницата регистрираме page.route
            route.fulfill({ // с fulfill връщаме данни
                body: JSON.stringify(mockedData.catalog),
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            });
        });

        await page.click('#loadBooks') //кликваме на нашия бутон да зареди книгите

        const books = await page.$$eval('tbody tr', (tr) => tr.map(s => s.textContent)); // показва ни книгите и ни дава цялата информация за тях

        // console.log(books);

        expect(books.length).to.equal(mockedData.catalog.length);//че имаме една книга след като се натисне бутона
    });
    it('create book', async () => { // да проверим първо че имаме форма, второ че може да пишем някакви неща в нея и 3то да я събмитнем и 4то че ще изпратим успешен request, който ще върне правилни данни
        const newBookData = mockedData.catalog[0]; // данните, които ще вкараме във формата
        await page.goto(host);
        await page.waitForSelector('#submit');

        const newBookTitle = newBookData.title + "random";
        const newBookAuthor = newBookData.author + "random";

        await page.fill('input[name="title"]', newBookTitle);
        await page.fill('input[name="author"]', newBookAuthor);

        const [request] = await Promise.all([
            page.waitForRequest('**/jsonstore/collections/books'),
            page.click("#submit"),
        ]);
        expect(request.method()).to.equal("POST");
        const postData = JSON.parse(request.postData());

        expect(postData.title).to.equal(newBookTitle);
        expect(postData.author).to.equal(newBookAuthor);
    });
});