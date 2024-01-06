function hoverEffect(hoverdiv, hovertip) {
    const div = app.get(hoverdiv);
    const tip = app.get(hovertip);

    div.addEventListener('mouseover', function() {
        tip.style.visibility = 'visible';
        tip.style.opacity = '1';
    });

    div.addEventListener('mouseout', function() {
        tip.style.opacity = '0';
        setTimeout(function() {
            tip.style.visibility = 'hidden';
        }, 500);
    });
}

hoverEffect('.htmldiv', '.htmltip');
hoverEffect('.jsdiv', '.jstip');
hoverEffect('.rwddiv', '.rwdtip');
hoverEffect('.githubdiv', '.githubtip');
hoverEffect('.webpackdiv', '.webpacktip');
hoverEffect('.reactdiv', '.reacttip');
hoverEffect('.unittestdiv', '.unittesttip');
hoverEffect('.cssdiv', '.csstip');
hoverEffect('.jquerydiv', '.jquerytip');
hoverEffect('.scssdiv', '.scsstip');
hoverEffect('.bootstrapdiv', '.bootstraptip');

app.get('.htmldiv').addEventListener('click', function() {
    gameContent('請問 HTML 是什麼？','標籤語言','資料庫工具','瀏覽器規範');
    app.get('.game-select-one').addEventListener('click',function() {
        typeEffect('-32px', '136px', '你通過第一關了，HTML 是成為前端工程師的橋頭堡，也是網站給人的第一印象，一定要學好才行。', '標籤語言', event);
        correctAns('.htmldiv', '.cssdiv', '.cssdiv');
    })
});

app.get('.cssdiv').addEventListener('click', function() {
    if(app.get('.cssdiv').style.cursor){
        gameContent('SCSS 跟 CSS 差別？','SCSS 用變數控制','SCSS 非縮排語法','不同程式語言');
        app.get('.game-select-one').addEventListener('click', function() {
            typeEffect('74px','44px', '哇，你竟然連 CSS 也略懂略懂。如果階層樣式學得好，就具備基礎網頁設計師的能力了，這時候，對於細節的掌握就更加重要囉。','SCSS 用變數控制', event);
            correctAns('.cssdiv', '.jsdiv', '.jsdiv');
        });
    }
});

app.get('.jsdiv').addEventListener('click', function() {
    if(app.get('.jsdiv').style.cursor){
        gameContent('何者非 JS 定義變數的方式？','function','var','let');
        app.get('.game-select-one').addEventListener('click', function() {
            typeEffect('74px','225px', '恭喜你通過 JavaScript 關卡。JavaScript 也是小編最喜歡的語言，掌握它，就等於邁入前端工程師的行列，它不只能為你帶來一份工作，也擴展你的視野，擁有接軌科技的能力。', 'function', event);
            correctAns('.jsdiv', '.rwddiv', '.jquerydiv');
        });
    }
});

app.get('.rwddiv').addEventListener('click', function() {
    if(app.get('.rwddiv').style.cursor){
        gameContent('如何在不同螢幕寬度下改變樣式？','透過 media 操作','使用事件物件','變數控制');
        app.get('.game-select-one').addEventListener('click', function() {
            typeEffect('172px','225px', 'RWD 很神奇吧，它讓你在手機、平板上，都能方便觀看網頁，而不用放大縮小視窗，是讓使用者體驗升級的良方。', '透過 media 操作', event);
            correctAns('.rwddiv', '.githubdiv', '.githubdiv');
        });
    }
});

app.get('.jquerydiv').addEventListener('click', function() {
    if(app.get('.jquerydiv').style.cursor){
        gameContent('jQuery 與 JS 之比較何者正確？','jQuery 含錢字符號','JS 是一種框架','jQuery 並未開源');
        app.get('.game-select-one').addEventListener('click', function() {
            typeEffect('172px','225px', 'jQuery 是相當方便的 JavaScript 函式庫，它幫你把程式封裝好，只要加上經典的 $ 字號作為前綴，就能使用眾多功能。', 'jQuery 含錢字符號', event);
            app.get('.jquerydiv').style.backgroundColor = 'rgb(26, 216, 211)';
            app.get('.jquerydiv').style.color = 'white';
        });
    }
});

app.get('.githubdiv').addEventListener('click', function() {
    if(app.get('.githubdiv').style.cursor){
        gameContent('GitHub 不能做什麼？','測試程式正確性','程式碼倉庫','共同軟體開發');
        app.get('.game-select-one').addEventListener('click', function() {
            typeEffect('280px','133px', '在學習程式語言之前，很難想像有 GitHub 的存在吧，竟然有個倉庫專門在管理程式語言，還能讓人複製、共同編輯，並記錄每一次的 commit ，是一款優秀的協作工具。', '測試程式正確性', event);
            correctAns('.githubdiv', '.scssdiv', '.webpackdiv');
        });
    }
});

app.get('.scssdiv').addEventListener('click', function() {
    if(app.get('.scssdiv').style.cursor){
        gameContent('何者不屬於 CSS 預處理器？','Gulp','SCSS','PostCSS');
        app.get('.game-select-one').addEventListener('click', function() {
            typeEffect('383px','45px', 'css 屬於程式設計入門款，而預處理器能以更有效率的方式，撰寫階層樣式，如果你擁有 JavaScript 的基本概念，學起來會特別快唷。', 'Gulp', event);
            correctAns('.scssdiv', '.bootstrapdiv', '.bootstrapdiv');
        });
    }
});

app.get('.webpackdiv').addEventListener('click', function() {
    if(app.get('.webpackdiv').style.cursor){
        gameContent('使用 Webpack 需要安裝？','Node.js','Babel','styled-components');
        app.get('.game-select-one').addEventListener('click', function() {
            typeEffect('383px','224px', '你已經越來越厲害，掌握了近期火紅的打包工具，Webpack 和 React 是絕配，是幫助瀏覽器進行「翻譯」的良方。', 'Node.js', event);
            correctAns('.webpackdiv', '.reactdiv', '.reactdiv');
        });
    }
});

app.get('.bootstrapdiv').addEventListener('click', function() {
    if(app.get('.bootstrapdiv').style.cursor){
        gameContent('Bootstrap 是一種？','樣式擴充元件','打包工具','套件管理工具');
        app.get('.game-select-one').addEventListener('click', function() {
            typeEffect('483px','39px', '看來你學蠻快的，Bootstrap 能做到的，css 也能做到，如果有時間，不仿試試手刻 Bootstrap 的特效，精進樣式調校的能力。', '樣式擴充元件', event);
            app.get('.bootstrapdiv').style.backgroundColor = 'rgb(26, 216, 211)';
            app.get('.bootstrapdiv').style.color = 'white';
        });
    }
});

app.get('.reactdiv').addEventListener('click', function() {
    if(app.get('.reactdiv').style.cursor){
        gameContent('React 有何特性？','建置單頁式網站','不存在異步問題','不需要 Babel 編譯');
        app.get('.game-select-one').addEventListener('click', function() {
            typeEffect('483px','230px', '你已經越來越厲害，掌握了近期火紅的打包工具，Webpack 和 React 是絕配，是幫助瀏覽器進行「翻譯」的良方。', '建置單頁式網站', event);
            correctAns('.reactdiv', '.unittestdiv', '.unittestdiv');
        });
    }
});

app.get('.unittestdiv').addEventListener('click', function() {
    if(app.get('.unittestdiv').style.cursor){
        gameContent('為什麼要做單元測試？','確保程式邏輯正確','讓 scrum 運作順利','資料安全性');
        app.get('.game-select-one').addEventListener('click', function() {
            typeEffect('588px','135px', '終於抵達最後一關了，單元測試是為了確保函式的正確性，而進行的作業。雖然單元測試是最後一關，但工程的世界無止盡，身為一位 geek 就是要不斷學習精進唷。', '確保程式邏輯正確', event);
            app.get('.unittestdiv').style.backgroundColor = 'rgb(26, 216, 211)';
            app.get('.unittestdiv').style.color = 'white';
        });
    }
});

const gameOutside = app.get('.game-outside');
gameOutside.addEventListener('click',function(event) {
    if(event.target === gameOutside){
        gameOutside.style.display = 'none';
        initialAns('.game-select-one');
        initialAns('.game-select-two');
        initialAns('.game-select-three');
        app.get('.arrow-continue').style.display = 'none';
    }
});

app.get('.game-select-two').addEventListener('click', function() {
    wrongAns('.game-select-two');
});

app.get('.game-select-three').addEventListener('click', function() {
    wrongAns('.game-select-three');
});

function gameContent(title, s1, s2, s3){
    app.get('.game-outside').style.display = 'flex';
    app.get('.game-title').textContent = title;
    app.get('.game-select-one').textContent = s1;
    app.get('.game-select-two').textContent = s2;
    app.get('.game-select-three').textContent = s3;
}

function typeEffect(top, left, text, ans, event) {
    app.get('.user-icon').style.top = top;
    app.get('.user-icon').style.left = left;
    if(event.target.textContent === ans){
        app.get('.full-type').style.display = 'flex';
        let str = text;
        let i = 0;
        function typeWord() {
            app.get('#bgMusic').play();
            if (i <= str.length) {
                app.get('.type-word').innerHTML = str.slice(0, i++) + '_';
                setTimeout(typeWord, 60);
            } else {    
                app.get('#bgMusic').pause();
                app.get('.type-word').innerHTML = str;
                setTimeout(function(){app.get('.full-type').style.display = 'none';}, 1000)
            }
        }
    }
    typeWord();
};

function correctAns(finishedDiv, nextDivOne, nextDivTwo) {
    app.get(finishedDiv).style.backgroundColor = 'rgb(26, 216, 211)';
    app.get(finishedDiv).style.color = 'white';
    app.get(nextDivOne).style.cursor = 'pointer';
    app.get(nextDivOne).style.color = 'rgb(26, 216, 211)';
    app.get(nextDivOne).style.border = '1px solid rgb(26, 216, 211)';
    app.get(nextDivTwo).style.cursor = 'pointer';
    app.get(nextDivTwo).style.color = 'rgb(26, 216, 211)';
    app.get(nextDivTwo).style.border = '1px solid rgb(26, 216, 211)';
    app.get('.arrow-continue').style.display = 'flex';
    app.get('.arrow-continue').addEventListener('click',function() {
        gameOutside.style.display = 'none';
        initialAns('.game-select-one');
        initialAns('.game-select-two');
        initialAns('.game-select-three');
        app.get('.arrow-continue').style.display = 'none';
    });
    const ans = app.get('.game-select-one');
    ans.style.background= 'url(../image/checked-FFD800.svg)';
    ans.style.backgroundSize= 'contain';
    ans.style.backgroundColor= 'rgba(255,255,255,0.8)';
    ans.style.backgroundRepeat= 'no-repeat';
    ans.style.backgroundOrigin = 'content-box';
}

function wrongAns(el) {
    app.get(el).style.animation = 'wrongAnsShake 0.6s ease 0s 1';
    app.get(el).style.background= 'url(../image/cancel-FC4803.svg)';
    app.get(el).style.backgroundSize= 'contain';
    app.get(el).style.backgroundColor= 'rgba(255,255,255,0.8)';
    app.get(el).style.backgroundRepeat= 'no-repeat';
    app.get(el).style.backgroundOrigin = 'content-box';
}

function initialAns(el) {
    app.get(el).style.animation = '';
    app.get(el).style.background = '';
    app.get(el).style.backgroundSize = '';
    app.get(el).style.backgroundColor = '';
    app.get(el).style.backgroundRepeat = '';
    app.get(el).style.backgroundOrigin = '';
}

app.get('.user-icon').addEventListener('click', function() {
    app.get('.icon-outside').style.display = 'flex';
});
app.get('.icon-outside').addEventListener('click', function() {
    app.get('.icon-outside').style.display = 'none';
});
app.get('.icon-one').addEventListener('click', function() {
    app.get('.user-icon').style.background = 'url(../image/cute.svg) left center / contain no-repeat';
    app.get('.icon-outside').style.display = 'none';
})
app.get('.icon-two').addEventListener('click', function() {
    app.get('.user-icon').style.background = 'url(../image/cute2.svg) left center / contain no-repeat';
    app.get('.icon-outside').style.display = 'none';
})
app.get('.icon-three').addEventListener('click', function() {
    app.get('.user-icon').style.background = 'url(../image/cute3.svg) left center / contain no-repeat';
    app.get('.icon-outside').style.display = 'none';
})