/**
 * name: CodeHandler
 * coder: gameloftyou
 * version: v1.0.1
 */

var contents = test_editor.getContent().replace(/&nbsp;/g,' ');


function Three(origin,lang,code)  
{
    this.origin = origin;
    this.lang = lang;
    this.code = code;
}

var reparr = new Array();
var patt = /\[code\s+lang\s*=\s*"([^\[]*)"\](.*?)\[\/code\s*\]/ig;
var result = null;

do
{
    result = patt.exec(contents);
    if(result)
    {
        reparr.push(new Three(result[0],result[1],result[2]));
    }
}
while(result!=null)

patt = /\[code\s*\](.*?)\[\/code\s*\]/ig;
do
{
    result = patt.exec(contents);
    if(result)
    {
        reparr.push(new Three(result[0],"c++",result[1]));
    }
}
while(result!=null)

String.prototype.replaceAll = function(substr,replacement)
{
    var str = this;
    while(str.indexOf(substr)!=-1)
    {
        str = str.replace(substr,replacement);
    }
    return str;
}

function deal(origin,code)
{
    code = code.replace(/<br\/><br\/>/g,"[br]").replace(/<br\/>/g,"[br]").replace(/<(strong|span|a)[^>]*>(.*?)<\/\1>/g,function(match0,match1,match2){return match2;}).replace(/ {2}/g,'\u3000');
    contents = contents.replaceAll(origin,code);
}

for(var i=0;i<reparr.length;++i)
{
    var lang = reparr[i].lang.toLowerCase();
    switch(lang)
    {
    case "c++":
        deal(reparr[i].origin,reparr[i].code);
        break;
    default:
        deal(reparr[i].origin,reparr[i].code);
    }
}

if(test_poster.getPostType()=="reply")
{
    test_poster.getPostData = function() {
    var t = this.editor.getExtendContent(),
            e = {
                content : contents
            };
            if (this.isFrs) {
                var o = this.getTitle(),
                i = this.$title.data("prefix");
                -1 == o.indexOf(i) && (i = ""),
                o = o.replace(/\u2006/g, ""),
                o = o.replace(i, ""),
                e.title = o,
                e.prefix = i;
                var s = this.$root.find("#rewards_check");
                if (s.length && "checked" == s.tbattr("checked")) {
                    var n = this.PostReward.getPosterData();
                    $.extend(e, n)
                }
                var r = this.getClassId();
                this.isIntelligentCategory() && (r && (e.second_class_id = r), e.cur_scid = $(".j_cur_scid").val(), e.is_intel_cate = 1)
            }
            t.videoNumber > 0 && (e.video_url = t.videoUrl, t.hasLocalVideo && (e.file_id = t.fileId)),
            t.ptype && (e.ptype = t.ptype),
            t.attachments && (e.files = t.attachments);
            var a = this.$root.find(".j_sign_id"),
            l = this.$root.find(".j_use_signature");
            l.tbattr("checked") && a.size() > 0 && a.val() && (e.sign_id = a.val());
            var d = this.$root.find(".j-beyond-push-checkbox");
            if (d.tbattr("checked") && (e.pushToBeyond = 1, e.beyondType = this.beyondType), e.game_user = this.getGameUser(), e.mouse_pwd = this.MousePwd.report().c, e.mouse_pwd_t = this.MousePwd.time, e.mouse_pwd_isclick = this.MousePwd.MOUSEPWD_CLICK, this.isPb && PosterContext.getContext().thread && 22 == PosterContext.getContext().thread.thread_type) {
                var c = {
                    rewards : 1
                };
                $.extend(e, c)
            }
            return e
    };
}
else
{
    test_poster.getPostData = function () {
			var t = this.editor.getExtendContent(),
			e = {
				content : contents
			};
			if (this.isFrs) {
				var i = this.getTitle(),
				o = this.$title.data("prefix");
				-1 == i.indexOf(o) && (o = ""),
				i = i.replace(/\u2006/g, ""),
				i = i.replace(o, ""),
				e.title = i,
				e.prefix = o
			}
			var s = this.postManager.firePostDataProcess({
					editorExtendContent : t,
					context : PosterContext
				}, e);
			e = $.extend({}, e, s);
			var n = this.$root.find(".j_sign_id"),
			r = this.$root.find(".j_use_signature");
			return r.tbattr("checked") && n.size() > 0 && n.val() && (e.sign_id = n.val()),
			e.mouse_pwd = this.MousePwd.report().c,
			e.mouse_pwd_t = this.MousePwd.time,
			e.mouse_pwd_isclick = this.MousePwd.MOUSEPWD_CLICK,
			e
	};
}    

test_poster.post();