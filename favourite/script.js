    /// Main XML functionality
    let BODY = document.querySelector("body");
    let parser, XMLDoc;

    let text = `
<favourite_list>
    <title>personalized favourite-list based on your behaviour</title>
    <chart>
        <song>
            <name>in the name of love</name>
            <artist>martin garrix</artist>
        </song>
        <song>
            <name>talking body</name>
            <artist>tove lo</artist>
        </song>
        <song>
            <name>apollo</name>
            <artist>hardwell</artist>
        </song>
        <song>
            <name>no limit</name>
            <artist>G-Easy</artist>
        </song>
        <song>
            <name>home</name>
            <artist>machine gun kelly</artist>
        </song>
    </chart>
    <chart>
        <song>
            <name>love story</name>
            <artist>taylor swift</artist>
        </song>
        <song>
            <name>Solo</name>
            <artist>Demi lovato</artist>
        </song>
        <song>
            <name>wolves</name>
            <artist>selena gomez</artist>
        </song>
        <song>
            <name>bad things</name>
            <artist>camila cabello</artist>
        </song>
        <song>
            <name>ruin my life</name>
            <artist>zara larsson</artist>
        </song>
    </chart>
    <chart>
        <song>
            <name>in the end</name>
            <artist>linkin park</artist>
        </song>
        <song>
            <name>Bad Liar</name>
            <artist>imagine Dragons</artist>
        </song>
        <song>
            <name>Counting Stars</name>
            <artist>one republic</artist>
        </song>
        <song>
            <name>hall of fame</name>
            <artist>Script</artist>
        </song>
        <song>
            <name>what makes you beautiful</name>
            <artist>one direction</artist>
        </song>
    </chart>
</favourite_list>
    `;
    parser = new DOMParser();
    XMLDoc = parser.parseFromString(text, "text/xml");
    result = "";
    for (const chart of XMLDoc.getElementsByTagName("chart")) {

        for (const song of chart.getElementsByTagName("song")) {
            console.log(song.getElementsByTagName("name")[0].textContent);
            console.log(song.getElementsByTagName("artist")[0].textContent);
            BODY.innerHTML += `<p class="">${song.getElementsByTagName("name")[0].textContent} - ${song.getElementsByTagName("artist")[0].textContent} </p>`
        }
        //result += `${book.childNodes[1].textContent} - ${book.childNodes[3].textContent} <br>`;
    }
    //document.getElementById("results").innerHTML = result;
    //console.log(result);
    //};

    function updateTextColour(value) {
        document.body.style.color = "#" + value;
    }

    function updateBackColour(value) {
        document.body.style.backgroundColor = "#" + value;
    }