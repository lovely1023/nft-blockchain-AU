let oObjectIDToAudioObjectMapping = {};
let audio;
$.ajax({
    type: "GET",
    url: "/api/v1/nft/landing",
    headers: {
        'Authorization': token
    },
    success: function (result, status, xhr) {
        console.log(result);
        let dataToAppend = '';
        if (result.data[0].mostViewed.length) {
            for (let nData = 0; nData < result.data[0].mostViewed.length; nData++) {
                if (result.data[0].mostViewed[nData].eType == 'Audio') {
                    var firstFive = result.data[0].mostViewed[nData].aCurrentOwner[0].sWalletAddress.slice(0, 10);
                    var lastFive = result.data[0].mostViewed[nData].aCurrentOwner[0].sWalletAddress.slice(result.data[0].mostViewed[nData].aCurrentOwner[0].sWalletAddress.length - 8, result.data[0].mostViewed[nData].aCurrentOwner[0].sWalletAddress.length);

                    // Binding Music
                    audio = new Audio(`https://ipfs.io/ipfs/${result.data[0].mostViewed[nData].sHash}`);
                    audio.setAttribute("preload", "metadata");
                    oObjectIDToAudioObjectMapping[result.data[0].mostViewed[nData]._id] = audio;

                    dataToAppend += `<div class="col-md-6 col-lg-6 col-xl-4 mb-4">
                    <div class="nft-card id_${result.data[0].mostViewed[nData]._id}">
                        <div class="nft-card-head overflow-hidden">
                            <a href="#" class="d-flex align-items-center overflow-hidden">
                                <img src="${(result.data[0].mostViewed[nData].aCurrentOwner[0].sProfilePicUrl != undefined) ? 'https://ipfs.io/ipfs/' + result.data[0].mostViewed[nData].aCurrentOwner[0].sProfilePicUrl : './assets/images/user-avatar.svg'} " class="img-fluid mr-3" height="24" width="24">
                                <span>${(result.data[0].mostViewed[nData].aCurrentOwner[0].sUserName == undefined || result.data[0].mostViewed[nData].aCurrentOwner[0].sUserName == "")  ? firstFive + '...' + lastFive : "@" + result.data[0].mostViewed[nData].aCurrentOwner[0].sUserName}</span>
                            </a>
                        </div>
                        <div class="nft-card-body">

                                <audio id="audio" controls class="d-none">
                                    <source src="https://ipfs.io/ipfs/${result.data[0].mostViewed[nData].sHash}" id="src" />
                                </audio>
                                <div class="audio-player">
                                    <div class="preview-thumb" style="text-align: center;">
                                        <img src="../assets/images/audio-preview.png" class="img-fluid" />
                                    </div>
                                    <div class="timeline">
                                        <div class="progress" id="progress_${result.data[0].mostViewed[nData]._id}"></div>
                                    </div>
                                    <div class="controls">
                                        <div class="play-container">
                                            <div class="toggle-play play" objID="${result.data[0].mostViewed[nData]._id}" id="playPauseButtons" onclick="playPause($(this))">
                                            </div>
                                        </div>
                                        <div class="time">
                                            <div class="current d-inline" id="current_${result.data[0].mostViewed[nData]._id}">0:00</div>
                                            <div class="divider d-inline">/</div>
                                            <div class="length d-inline" id="duration_${result.data[0].mostViewed[nData]._id}">
                                        </div>
                                        </div>
                                        <div class="volume-container">
                                            <div class="volume-button">
                                                <div class="volume icono-volumeMedium"></div>
                                            </div>

                                            <div class="volume-slider">
                                                <div class="volume-percentage"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        </div>
                        <div class="nft-card-footer">
                            <div class="row">
                                <div class="col">
                                    <a href="viewNFT/` + result.data[0].mostViewed[nData]._id + `">
                                        <h3 class="font-family-infra-semibold mb-3 text-center text-lg-left">
                                        ${result.data[0].mostViewed[nData].sName}</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <p class="mb-0 meta-price font-family-bs-regular text-center text-lg-left">
                                        Base Price:- ${result.data[0].mostViewed[nData].nBasePrice.$numberDecimal} BNB</p>
                                </div>
                                <div class="col-lg-6">
                                    <p
                                        class="mb-0 text-capitalize font-family-bs-regular meta-cat text-center text-lg-right">
                                        Category:- ${result.data[0].mostViewed[nData].eType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                } else {
                    var firstFive = result.data[0].mostViewed[nData].aCurrentOwner[0].sWalletAddress.slice(0, 10);
                    var lastFive = result.data[0].mostViewed[nData].aCurrentOwner[0].sWalletAddress.slice(result.data[0].mostViewed[nData].aCurrentOwner[0].sWalletAddress.length - 8, result.data[0].mostViewed[nData].aCurrentOwner[0].sWalletAddress.length);
                    dataToAppend += `<div class="col-md-6 col-lg-6 col-xl-4 mb-4">
                    <div class="nft-card">
                        <div class="nft-card-head overflow-hidden">
                            <a href="#" class="d-flex align-items-center overflow-hidden">
                                <img src="${(result.data[0].mostViewed[nData].aCurrentOwner[0].sProfilePicUrl != undefined) ? 'https://ipfs.io/ipfs/' + result.data[0].mostViewed[nData].aCurrentOwner[0].sProfilePicUrl : './assets/images/user-avatar.svg'} " class="img-fluid mr-3" height="24" width="24">
                                <span>${(result.data[0].mostViewed[nData].aCurrentOwner[0].sUserName == undefined  || result.data[0].mostViewed[nData].aCurrentOwner[0].sUserName == "")  ? firstFive + '...' + lastFive : "@" + result.data[0].mostViewed[nData].aCurrentOwner[0].sUserName}</span>
                            </a>
                        </div>
                        <div class="nft-card-body">
                            <a href="viewNFT/` + result.data[0].mostViewed[nData]._id + `">
                                <img src="https://ipfs.io/ipfs/${result.data[0].mostViewed[nData].sHash}" class="img-fluid w-100" style="height:289px" />
                            </a>
                        </div>
                        <div class="nft-card-footer">
                            <div class="row">
                                <div class="col">
                                    <a href="viewNFT/` + result.data[0].mostViewed[nData]._id + `">
                                        <h3 class="font-family-infra-semibold mb-3 text-center text-lg-left">
                                        ${result.data[0].mostViewed[nData].sName}</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <p class="mb-0 meta-price font-family-bs-regular text-center text-lg-left">
                                        Base Price:- ${result.data[0].mostViewed[nData].nBasePrice.$numberDecimal} BNB</p>
                                </div>
                                <div class="col-lg-6">
                                    <p
                                        class="mb-0 text-capitalize font-family-bs-regular meta-cat text-center text-lg-right">
                                        Category:- ${result.data[0].mostViewed[nData].eType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                }
            }
            $('#MostViewedNFTNoNFTData').fadeOut();
            $("#nftlist").append(dataToAppend)
            $('.nft-new-item').hide();
            $('#MostViewedNFTLoader').fadeOut(function () {
                $(".nft-new-item").fadeIn().removeClass('nft-new-item');
            });
        } else {

            $('#MostViewedNFTLoader').fadeOut(function () {
                $('#MostViewedNFTNoNFTData').fadeIn();
            });
        }
        if (result.data[0].recentlyAdded.length) {
            dataToAppend = '';
            for (let nData = 0; nData < result.data[0].recentlyAdded.length; nData++) {
                if (result.data[0].recentlyAdded[nData].eType == 'Audio') {
                    var firstFive = result.data[0].recentlyAdded[nData].aCurrentOwner[0].sWalletAddress.slice(0, 10);
                    var lastFive = result.data[0].recentlyAdded[nData].aCurrentOwner[0].sWalletAddress.slice(result.data[0].recentlyAdded[nData].aCurrentOwner[0].sWalletAddress.length - 8, result.data[0].recentlyAdded[nData].aCurrentOwner[0].sWalletAddress.length);

                    // Binding Music
                    audio = new Audio(`https://ipfs.io/ipfs/${result.data[0].recentlyAdded[nData].sHash}`);
                    audio.setAttribute("preload", "metadata");
                    oObjectIDToAudioObjectMapping[result.data[0].recentlyAdded[nData]._id] = audio;

                    dataToAppend += `<div class="col-md-6 col-lg-6 col-xl-4 mb-4">
                    <div class="nft-card id_${result.data[0].recentlyAdded[nData]._id}">
                        <div class="nft-card-head overflow-hidden">
                            <a href="#" class="d-flex align-items-center overflow-hidden">
                                <img src="${(result.data[0].recentlyAdded[nData].aCurrentOwner[0].sProfilePicUrl != undefined) ? 'https://ipfs.io/ipfs/' + result.data[0].recentlyAdded[nData].aCurrentOwner[0].sProfilePicUrl : './assets/images/user-avatar.svg'} " class="img-fluid mr-3" height="24" width="24">
                                <span>${(result.data[0].recentlyAdded[nData].aCurrentOwner[0].sUserName == undefined  || result.data[0].recentlyAdded[nData].aCurrentOwner[0].sUserName == "") ? firstFive + '...' + lastFive : "@" + result.data[0].recentlyAdded[nData].aCurrentOwner[0].sUserName}</span>
                            </a>
                        </div>
                        <div class="nft-card-body">

                                <audio id="audio" controls class="d-none">
                                    <source src="https://ipfs.io/ipfs/${result.data[0].recentlyAdded[nData].sHash}" id="src" />
                                </audio>
                                <div class="audio-player">
                                    <div class="preview-thumb" style="text-align: center;">
                                        <img src="../assets/images/audio-preview.png" class="img-fluid" />
                                    </div>
                                    <div class="timeline">
                                        <div class="progress" id="progress_${result.data[0].recentlyAdded[nData]._id}"></div>
                                    </div>
                                    <div class="controls">
                                        <div class="play-container">
                                            <div class="toggle-play play" objID="${result.data[0].recentlyAdded[nData]._id}" id="playPauseButtons" onclick="playPause($(this))">
                                            </div>
                                        </div>
                                        <div class="time">
                                            <div class="current d-inline" id="current_${result.data[0].recentlyAdded[nData]._id}">0:00</div>
                                            <div class="divider d-inline">/</div>
                                            <div class="length d-inline" id="duration_${result.data[0].recentlyAdded[nData]._id}">
                                        </div>
                                        </div>
                                        <div class="volume-container">
                                            <div class="volume-button">
                                                <div class="volume icono-volumeMedium"></div>
                                            </div>

                                            <div class="volume-slider">
                                                <div class="volume-percentage"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        </div>
                        <div class="nft-card-footer">
                            <div class="row">
                                <div class="col">
                                    <a href="viewNFT/` + result.data[0].recentlyAdded[nData]._id + `">
                                        <h3 class="font-family-infra-semibold mb-3 text-center text-lg-left">
                                        ${result.data[0].recentlyAdded[nData].sName}</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <p class="mb-0 meta-price font-family-bs-regular text-center text-lg-left">
                                        Base Price:- ${result.data[0].recentlyAdded[nData].nBasePrice.$numberDecimal} BNB</p>
                                </div>
                                <div class="col-lg-6">
                                    <p
                                        class="mb-0 text-capitalize font-family-bs-regular meta-cat text-center text-lg-right">
                                        Category:- ${result.data[0].recentlyAdded[nData].eType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                } else {
                    var firstFive = result.data[0].recentlyAdded[nData].aCurrentOwner[0].sWalletAddress.slice(0, 10);
                    var lastFive = result.data[0].recentlyAdded[nData].aCurrentOwner[0].sWalletAddress.slice(result.data[0].recentlyAdded[nData].aCurrentOwner[0].sWalletAddress.length - 8, result.data[0].recentlyAdded[nData].aCurrentOwner[0].sWalletAddress.length);
                    dataToAppend += `<div class="col-md-6 col-lg-6 col-xl-4 mb-4">
                    <div class="nft-card">
                        <div class="nft-card-head overflow-hidden">
                            <a href="#" class="d-flex align-items-center overflow-hidden">
                                <img src="${(result.data[0].recentlyAdded[nData].aCurrentOwner[0].sProfilePicUrl != undefined) ? 'https://ipfs.io/ipfs/' + result.data[0].recentlyAdded[nData].aCurrentOwner[0].sProfilePicUrl : './assets/images/user-avatar.svg'} " class="img-fluid mr-3" height="24" width="24">
                                <span>${(result.data[0].recentlyAdded[nData].aCurrentOwner[0].sUserName == undefined || result.data[0].recentlyAdded[nData].aCurrentOwner[0].sUserName == "") ? firstFive + '...' + lastFive : "@" + result.data[0].recentlyAdded[nData].aCurrentOwner[0].sUserName}</span>
                            </a>
                        </div>
                        <div class="nft-card-body">
                            <a href="viewNFT/` + result.data[0].recentlyAdded[nData]._id + `">
                                <img src="https://ipfs.io/ipfs/${result.data[0].recentlyAdded[nData].sHash}" class="img-fluid w-100" style="height:289px" />
                            </a>
                        </div>
                        <div class="nft-card-footer">
                            <div class="row">
                                <div class="col">
                                    <a href="viewNFT/` + result.data[0].recentlyAdded[nData]._id + `">
                                        <h3 class="font-family-infra-semibold mb-3 text-center text-lg-left">
                                        ${result.data[0].recentlyAdded[nData].sName}</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <p class="mb-0 meta-price font-family-bs-regular text-center text-lg-left">
                                        Base Price:- ${result.data[0].recentlyAdded[nData].nBasePrice.$numberDecimal} BNB</p>
                                </div>
                                <div class="col-lg-6">
                                    <p
                                        class="mb-0 text-capitalize font-family-bs-regular meta-cat text-center text-lg-right">
                                        Category:- ${result.data[0].recentlyAdded[nData].eType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                }
            }
            $('#recentlyAddedNFTNoNFTData').fadeOut();
            $("#recentlyAddedNFTs").append(dataToAppend)
            $('.nft-new-item').hide();
            $('#recentlyAddedNFTLoader').fadeOut(function () {
                $(".nft-new-item").fadeIn().removeClass('nft-new-item');
            });
        } else {
            $('#recentlyAddedNFTLoader').fadeOut(function () {
                $('#recentlyAddedNFTNoNFTData').fadeIn();
            });
        }
        if (result.data[0].onSale.length) {
            dataToAppend = '';
            for (let nData = 0; nData < result.data[0].onSale.length; nData++) {
                if (result.data[0].onSale[nData].eType == 'Audio') {
                    var firstFive = result.data[0].onSale[nData].aCurrentOwner[0].sWalletAddress.slice(0, 10);
                    var lastFive = result.data[0].onSale[nData].aCurrentOwner[0].sWalletAddress.slice(result.data[0].onSale[nData].aCurrentOwner[0].sWalletAddress.length - 8, result.data[0].onSale[nData].aCurrentOwner[0].sWalletAddress.length);

                    // Binding Music
                    audio = new Audio(`https://ipfs.io/ipfs/${result.data[0].onSale[nData].sHash}`);
                    audio.setAttribute("preload", "metadata");
                    oObjectIDToAudioObjectMapping[result.data[0].onSale[nData]._id] = audio;

                    dataToAppend += `<div>
                    <div class="nft-card id_${result.data[0].onSale[nData]._id}">
                        <a href="viewNFT/` + result.data[0].onSale[nData]._id + `" class="card__cover">
                            <audio id="audio" controls class="d-none">
                                <source src="https://ipfs.io/ipfs/${result.data[0].onSale[nData].sHash}" id="src" />
                            </audio>
                            <div class="audio-player">
                                <div class="preview-thumb" style="text-align: center;">
                                    <img src="../assets/images/audio-preview.png" class="img-fluid" />
                                </div>
                                <div class="timeline">
                                    <div class="progress" id="progress_${result.data[0].onSale[nData]._id}"></div>
                                </div>
                                <div class="controls">
                                    <div class="play-container">
                                        <div class="toggle-play play" objID="${result.data[0].onSale[nData]._id}" id="playPauseButtons" onclick="playPause($(this))">
                                        </div>
                                    </div>
                                    <div class="time">
                                        <div class="current d-inline" id="current_${result.data[0].onSale[nData]._id}">0:00</div>
                                        <div class="divider d-inline">/</div>
                                        <div class="length d-inline" id="duration_${result.data[0].onSale[nData]._id}">
                                    </div>
                                    </div>
                                    <div class="volume-container">
                                        <div class="volume-button">
                                            <div class="volume icono-volumeMedium"></div>
                                        </div>
                
                                        <div class="volume-slider">
                                            <div class="volume-percentage"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span class="card__time card__time--clock">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.46777,8.39453l-.00225.00183-.00214.00208ZM18.42188,8.208a1.237,1.237,0,0,0-.23-.17481.99959.99959,0,0,0-1.39941.41114,5.78155,5.78155,0,0,1-1.398,1.77734,8.6636,8.6636,0,0,0,.1333-1.50977,8.71407,8.71407,0,0,0-4.40039-7.582,1.00009,1.00009,0,0,0-1.49121.80567A7.017,7.017,0,0,1,7.165,6.87793l-.23047.1875a8.51269,8.51269,0,0,0-1.9873,1.8623A8.98348,8.98348,0,0,0,8.60254,22.83594.99942.99942,0,0,0,9.98,21.91016a1.04987,1.04987,0,0,0-.0498-.3125,6.977,6.977,0,0,1-.18995-2.58106,9.004,9.004,0,0,0,4.3125,4.0166.997.997,0,0,0,.71534.03809A8.99474,8.99474,0,0,0,18.42188,8.208ZM14.51709,21.03906a6.964,6.964,0,0,1-3.57666-4.40234,8.90781,8.90781,0,0,1-.17969-.96387,1.00025,1.00025,0,0,0-.79931-.84473A.982.982,0,0,0,9.77,14.80957a.99955.99955,0,0,0-.8667.501,8.9586,8.9586,0,0,0-1.20557,4.71777,6.98547,6.98547,0,0,1-1.17529-9.86816,6.55463,6.55463,0,0,1,1.562-1.458.74507.74507,0,0,0,.07422-.05469s.29669-.24548.30683-.2511a8.96766,8.96766,0,0,0,2.89874-4.63269,6.73625,6.73625,0,0,1,1.38623,8.08789,1.00024,1.00024,0,0,0,1.18359,1.418,7.85568,7.85568,0,0,0,3.86231-2.6875,7.00072,7.00072,0,0,1-3.2793,10.457Z"></path></svg>
                                <span class="card__clock card__clock--2">00:06:17</span>
                            </span>
                        </a>
                        <h3 class="card__title"><a href="viewNFT/` + result.data[0].onSale[nData]._id + `">${result.data[0].onSale[nData].sName}</a></h3>
                        <div class="card__author card__author--verified">
                            <img src="${(result.data[0].onSale[nData].aCurrentOwner[0].sProfilePicUrl != undefined) ? 'https://ipfs.io/ipfs/' + result.data[0].onSale[nData].aCurrentOwner[0].sProfilePicUrl : './assets/images/user-avatar.svg'} " alt="">
                            <a href="author.html">${(result.data[0].onSale[nData].aCurrentOwner[0].sUserName == undefined || result.data[0].onSale[nData].aCurrentOwner[0].sUserName == "")  ? firstFive + '...' + lastFive : "@" + result.data[0].onSale[nData].aCurrentOwner[0].sUserName}</a>
                        </div>
                        <div class="card__info">
                            <div class="card__price">
                                <span>Base price</span>
                                <span>${result.data[0].onSale[nData].nBasePrice.$numberDecimal} BNB</span>
                            </div>
                            
                            <button class="card__likes" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"></path></svg>
                                <span>23</span>
                            </button>
                        </div>
                    </div>
                </div>`;
                } else {
                    var firstFive = result.data[0].onSale[nData].aCurrentOwner[0].sWalletAddress.slice(0, 10);
                    var lastFive = result.data[0].onSale[nData].aCurrentOwner[0].sWalletAddress.slice(result.data[0].onSale[nData].aCurrentOwner[0].sWalletAddress.length - 8, result.data[0].onSale[nData].aCurrentOwner[0].sWalletAddress.length);
                    dataToAppend += `<div>
                    <div class="nft-card">
                        <a href="viewNFT/` + result.data[0].onSale[nData]._id + `" class="card__cover">
                            <img src="https://ipfs.io/ipfs/${result.data[0].onSale[nData].sHash}" alt="">
                            <span class="card__time card__time--clock">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.46777,8.39453l-.00225.00183-.00214.00208ZM18.42188,8.208a1.237,1.237,0,0,0-.23-.17481.99959.99959,0,0,0-1.39941.41114,5.78155,5.78155,0,0,1-1.398,1.77734,8.6636,8.6636,0,0,0,.1333-1.50977,8.71407,8.71407,0,0,0-4.40039-7.582,1.00009,1.00009,0,0,0-1.49121.80567A7.017,7.017,0,0,1,7.165,6.87793l-.23047.1875a8.51269,8.51269,0,0,0-1.9873,1.8623A8.98348,8.98348,0,0,0,8.60254,22.83594.99942.99942,0,0,0,9.98,21.91016a1.04987,1.04987,0,0,0-.0498-.3125,6.977,6.977,0,0,1-.18995-2.58106,9.004,9.004,0,0,0,4.3125,4.0166.997.997,0,0,0,.71534.03809A8.99474,8.99474,0,0,0,18.42188,8.208ZM14.51709,21.03906a6.964,6.964,0,0,1-3.57666-4.40234,8.90781,8.90781,0,0,1-.17969-.96387,1.00025,1.00025,0,0,0-.79931-.84473A.982.982,0,0,0,9.77,14.80957a.99955.99955,0,0,0-.8667.501,8.9586,8.9586,0,0,0-1.20557,4.71777,6.98547,6.98547,0,0,1-1.17529-9.86816,6.55463,6.55463,0,0,1,1.562-1.458.74507.74507,0,0,0,.07422-.05469s.29669-.24548.30683-.2511a8.96766,8.96766,0,0,0,2.89874-4.63269,6.73625,6.73625,0,0,1,1.38623,8.08789,1.00024,1.00024,0,0,0,1.18359,1.418,7.85568,7.85568,0,0,0,3.86231-2.6875,7.00072,7.00072,0,0,1-3.2793,10.457Z"></path></svg>
                                <span class="card__clock card__clock--2">00:06:17</span>
                            </span>
                        </a>
                        <h3 class="card__title"><a href="viewNFT/` + result.data[0].onSale[nData]._id + `">${result.data[0].onSale[nData].sName}</a></h3>
                        <div class="card__author card__author--verified">
                            <img src="${(result.data[0].onSale[nData].aCurrentOwner[0].sProfilePicUrl != undefined) ? 'https://ipfs.io/ipfs/' + result.data[0].onSale[nData].aCurrentOwner[0].sProfilePicUrl : './assets/images/user-avatar.svg'} " alt="">
                            <a href="author.html">${(result.data[0].onSale[nData].aCurrentOwner[0].sUserName == undefined || result.data[0].onSale[nData].aCurrentOwner[0].sUserName == "")  ? firstFive + '...' + lastFive : "@" + result.data[0].onSale[nData].aCurrentOwner[0].sUserName}</a>
                        </div>
                        <div class="card__info">
                            <div class="card__price">
                                <span>Base price</span>
                                <span>${result.data[0].onSale[nData].nBasePrice.$numberDecimal} BNB</span>
                            </div>
                            
                            <button class="card__likes" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"></path></svg>
                                <span>23</span>
                            </button>
                        </div>
                    </div>
                </div>`;
                }
            }
            $('#recentlyAddedNFTNoNFTData').fadeOut();
            $("#onSaleNFTs").append(dataToAppend)
            $('.nft-new-item').hide();
            $('#onSaleNFTLoader').fadeOut(function () {
                $(".nft-new-item").fadeIn().removeClass('nft-new-item');
            });
        } else {
            $('#onSaleNFTLoader').fadeOut(function () {
                $('#onSaleNFTNoNFTData').fadeIn();
            });
        }
        if (result.data[0].onAuction.length) {
            dataToAppend = '';
            for (let nData = 0; nData < result.data[0].onAuction.length; nData++) {
                if (result.data[0].onAuction[nData].eType == 'Audio') {
                    var firstFive = result.data[0].onAuction[nData].aCurrentOwner[0].sWalletAddress.slice(0, 10);
                    var lastFive = result.data[0].onAuction[nData].aCurrentOwner[0].sWalletAddress.slice(result.data[0].onAuction[nData].aCurrentOwner[0].sWalletAddress.length - 8, result.data[0].onAuction[nData].aCurrentOwner[0].sWalletAddress.length);

                    // Binding Music
                    audio = new Audio(`https://ipfs.io/ipfs/${result.data[0].onAuction[nData].sHash}`);
                    audio.setAttribute("preload", "metadata");
                    oObjectIDToAudioObjectMapping[result.data[0].onAuction[nData]._id] = audio;

                    dataToAppend += `<div class="col-md-6 col-lg-6 col-xl-4 mb-4">
                    <div class="nft-card id_${result.data[0].onAuction[nData]._id}">
                        <div class="nft-card-head overflow-hidden">
                            <a href="#" class="d-flex align-items-center overflow-hidden">
                                <img src="${(result.data[0].onAuction[nData].aCurrentOwner[0].sProfilePicUrl != undefined) ? 'https://ipfs.io/ipfs/' + result.data[0].onAuction[nData].aCurrentOwner[0].sProfilePicUrl : './assets/images/user-avatar.svg'} " class="img-fluid mr-3" height="24" width="24">
                                <span>${(result.data[0].onAuction[nData].aCurrentOwner[0].sUserName == undefined || result.data[0].onAuction[nData].aCurrentOwner[0].sUserName == "")  ? firstFive + '...' + lastFive : "@" + result.data[0].onAuction[nData].aCurrentOwner[0].sUserName}</span>
                            </a>
                        </div>
                        <div class="nft-card-body">

                                <audio id="audio" controls class="d-none">
                                    <source src="https://ipfs.io/ipfs/${result.data[0].onAuction[nData].sHash}" id="src" />
                                </audio>
                                <div class="audio-player">
                                    <div class="preview-thumb" style="text-align: center;">
                                        <img src="../assets/images/audio-preview.png" class="img-fluid" />
                                    </div>
                                    <div class="timeline">
                                        <div class="progress" id="progress_${result.data[0].onAuction[nData]._id}"></div>
                                    </div>
                                    <div class="controls">
                                        <div class="play-container">
                                            <div class="toggle-play play" objID="${result.data[0].onAuction[nData]._id}" id="playPauseButtons" onclick="playPause($(this))">
                                            </div>
                                        </div>
                                        <div class="time">
                                            <div class="current d-inline" id="current_${result.data[0].onAuction[nData]._id}">0:00</div>
                                            <div class="divider d-inline">/</div>
                                            <div class="length d-inline" id="duration_${result.data[0].onAuction[nData]._id}">
                                        </div>
                                        </div>
                                        <div class="volume-container">
                                            <div class="volume-button">
                                                <div class="volume icono-volumeMedium"></div>
                                            </div>

                                            <div class="volume-slider">
                                                <div class="volume-percentage"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        </div>
                        <div class="nft-card-footer">
                            <div class="row">
                                <div class="col">
                                    <a href="viewNFT/` + result.data[0].onAuction[nData]._id + `">
                                        <h3 class="font-family-infra-semibold mb-3 text-center text-lg-left">
                                        ${result.data[0].onAuction[nData].sName}</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <p class="mb-0 meta-price font-family-bs-regular text-center text-lg-left">
                                        Base Price:- ${result.data[0].onAuction[nData].nBasePrice.$numberDecimal} BNB</p>
                                </div>
                                <div class="col-lg-6">
                                    <p
                                        class="mb-0 text-capitalize font-family-bs-regular meta-cat text-center text-lg-right">
                                        Category:- ${result.data[0].onAuction[nData].eType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                } else {
                    var firstFive = result.data[0].onAuction[nData].aCurrentOwner[0].sWalletAddress.slice(0, 10);
                    var lastFive = result.data[0].onAuction[nData].aCurrentOwner[0].sWalletAddress.slice(result.data[0].onAuction[nData].aCurrentOwner[0].sWalletAddress.length - 8, result.data[0].onAuction[nData].aCurrentOwner[0].sWalletAddress.length);
                    dataToAppend += `<div class="col-md-6 col-lg-6 col-xl-4 mb-4">
                    <div class="nft-card">
                        <div class="nft-card-head overflow-hidden">
                            <a href="#" class="d-flex align-items-center overflow-hidden">
                                <img src="${(result.data[0].onAuction[nData].aCurrentOwner[0].sProfilePicUrl != undefined) ? 'https://ipfs.io/ipfs/' + result.data[0].onAuction[nData].aCurrentOwner[0].sProfilePicUrl : './assets/images/user-avatar.svg'} " class="img-fluid mr-3" height="24" width="24">
                                <span>${(result.data[0].onAuction[nData].aCurrentOwner[0].sUserName == undefined || result.data[0].onAuction[nData].aCurrentOwner[0].sUserName == "")  ? firstFive + '...' + lastFive : "@" + result.data[0].onAuction[nData].aCurrentOwner[0].sUserName}</span>
                            </a>
                        </div>
                        <div class="nft-card-body">
                            <a href="viewNFT/` + result.data[0].onAuction[nData]._id + `">
                                <img src="https://ipfs.io/ipfs/${result.data[0].onAuction[nData].sHash}" class="img-fluid w-100" style="height:289px" />
                            </a>
                        </div>
                        <div class="nft-card-footer">
                            <div class="row">
                                <div class="col">
                                    <a href="viewNFT/` + result.data[0].onAuction[nData]._id + `">
                                        <h3 class="font-family-infra-semibold mb-3 text-center text-lg-left">
                                        ${result.data[0].onAuction[nData].sName}</h3>
                                    </a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <p class="mb-0 meta-price font-family-bs-regular text-center text-lg-left">
                                        Base Price:- ${result.data[0].onAuction[nData].nBasePrice.$numberDecimal} BNB</p>
                                </div>
                                <div class="col-lg-6">
                                    <p
                                        class="mb-0 text-capitalize font-family-bs-regular meta-cat text-center text-lg-right">
                                        Category:- ${result.data[0].onAuction[nData].eType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                }
            }
            $('#onAuctionNFTNoNFTData').fadeOut();
            $("#onAuctionNFTs").append(dataToAppend)
            $('.nft-new-item').hide();
            $('#onAuctionNFTLoader').fadeOut(function () {
                $(".nft-new-item").fadeIn().removeClass('nft-new-item');
            });
        } else {
            $('#onAuctionNFTLoader').fadeOut(function () {
                $('#onAuctionNFTNoNFTData').fadeIn();
            });
        }
        loadDuration();
    },
    error: function (xhr, status, error) {
        console.log('====================================');
        console.log(xhr);
        console.log('====================================');
        toastr["error"](xhr.responseJSON.message);
        $('#MostViewedNFTLoader').fadeOut(function () {
            $('#MostViewedNFTNoNFTData').fadeIn();
        });
        $('#recentlyAddedNFTLoader').fadeOut(function () {
            $('#recentlyAddedNFTNoNFTData').fadeIn();
        });
        $('#onSaleNFTLoader').fadeOut(function () {
            $('#onSaleNFTNoNFTData').fadeIn();
        });
        $('#onAuctionNFTLoader').fadeOut(function () {
            $('#onAuctionNFTNoNFTData').fadeIn();
        });
        return false;
    }
});


function loadDuration() {
    for (const [objID, audioObj] of Object.entries(oObjectIDToAudioObjectMapping)) {
        audioObj.addEventListener("loadedmetadata", () => {
            $("#duration_" + objID).text(getTimeCodeFromNum(audioObj.duration));
        });
    }
}

function playPause(btn) {
    if (oObjectIDToAudioObjectMapping[btn.attr("objID")].paused) {
        btn.removeClass("play");
        btn.addClass("pause");
        oObjectIDToAudioObjectMapping[btn.attr("objID")].play();

        // Set Interval
        //check audio percentage and update time accordingly
        oObjectIDToAudioObjectMapping[btn.attr("objID")]["Interval"] = setInterval(() => {
            const progressBar = $("#progress_" + btn.attr("objID"));
            progressBar.css("margin-left", oObjectIDToAudioObjectMapping[btn.attr("objID")].currentTime / oObjectIDToAudioObjectMapping[btn.attr("objID")].duration * 100 + "%");
            $("#current_" + btn.attr("objID")).text(getTimeCodeFromNum(
                oObjectIDToAudioObjectMapping[btn.attr("objID")].currentTime
            ));
        }, 200);
    } else {
        btn.removeClass("pause");
        btn.addClass("play");
        oObjectIDToAudioObjectMapping[btn.attr("objID")].pause();

        // Clear Interval
        clearInterval(oObjectIDToAudioObjectMapping[btn.attr("objID")]["Interval"])
    }
}

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}