ctx.draw(function () { wx.canvasGetImageData({ canvasId: canvasid //参数，canvas标签的id    x:0,                                                                      //起始位置，x坐标    y:0,    width:width,   height:height,    success:function(res){           //引入upng，将图片转化成utf-8格式            let pngData = upng.encoded([res.data.buffer].res.width,res.height）            //再转化成base64            let bs64 = wx.arrayBufferToBase64(pngData)        }     })});