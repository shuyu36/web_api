$(function () {
  $.ajax({
    url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-97796B05-E95A-41EC-89F6-9D0960568C9C&locationName=%E5%A3%AB%E6%9E%97%E5%8D%80&elementName=T",
    type: "GET",
    dataType: "json",
    success: function (resource) {
      console.log(resource.records.locations[0].location[0].locationName);
      console.log(resource);

      let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sta"];
      let j = 0;
      $("#city_name").html(resource.records.locations[0].locationsName);
      $("#district").html(
        resource.records.locations[0].location[0].locationName
      );
      $("#tempture").html(
        resource.records.locations[0].location[0].weatherElement[0].time[0]
          .elementValue[0].value + "&#176"
      );

      for (let i = 0; i < 10; i++) {
        // 在迴圈裡面找現在資料在哪
        // 找星期幾 small元素
        console.log($('.block').eq(i).find('small').html());
        // 找星期幾的溫度h6>strong
        console.log($('.block').eq(i).find('h6').html());


        if ((i % 2) == 0) {
            let T = resource.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value
            let tempture = `<strong>${T}&#176;</strong>`;
            let wd = resource.records.locations[0].location[0].weatherElement[0].time[i].startTime;



            $('.block').eq(j).find('h6').html(tempture);
            const d = new Date(wd);
            // 設成索引值
            let day_index = d.getDay()

            // 從今天開始算的一周天氣
            $('.block').eq(j).find('small').html(weekday[day_index])
            j++;

        }
    }
    },
    error: function (error) {
      console.log(error);
    },
  });
});
