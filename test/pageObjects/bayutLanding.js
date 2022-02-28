class Bayut
{
    get Location()
    {
        return $("[class='a41c4dcc _6a3a3de9']")
    }
    get locationSugestion()
    {
        return $("li[data-selected='true'] button[class='_0e756b14']")
    }

    get Property()
    {
        return $("[class='ef5cccac']")
    }

    get forsale()
    {
        return $("[aria-label='Buy']")
    }

    get findbutton()
    {
        return $("[aria-label='Find button']")
    }


}

module.exports = new Bayut()