# ghibli
## მოკლე აღწერა

* Ghibli Studio-ს მიერ შექმნილი ფილმების აღმწერი აპლიკაცია

* აპლიკაცია შედგება 3 ძირითადი გვერდისგან:

  * ***home***

    სანავიგაციო გვერდი, საიდანაც ხდება 5 ტიპის/კატეგორიის:

    * **Films**
    * **People**
    * **Locations**
    * **Species**
    * **Vehicles**

    ***list*** გვერდებზე ნავიგაცია

  * ***list***

    შესაბამისი კატეგორიის სიის სახით წარმოსაჩენი გვერდი,

    საიდანაც ხდება ***details*** გვერდებზე ნავიგაცია

  * ***details***

    კონკრეტული კატეგორიისა და სუბიექტის აღმწერი დეტალური გვერდი,

    საიდანაც ხდება ამ სუბიექტის დეტალების წარმოდგენა და მასთან ასოცირებულ სხვა კატეგორიის ***list*** გვერდზებზე ნავიგაცია

    აღსანიშნია, რომ თუ კი ასოცირებული კატეგორიის სიაში მხოლოდ 1 წევრია, ნავიგაცია ხდება ისევ ***details*** გვერდზე

* მონაცემების მისაღებად აპლიკაცია იყენებს Public API-ს:

  https://ghibliapi.herokuapp.com/?ref=apilist.fun

## როგორ გავუშვათ აპლიკაცია

***live server***-ით გავუშვათ *home* დირექტორიაში არსებული **index.html** ფაილი

აპლიკაციის ***live server***-ით გაშვება აუცილებელია!

წინააღმდეგ შემთხვევაში *javascript*-ში არსებული მოდულების და-*import*-ების კოდი გადის შემდეგ *error*-ზე:
  
*Access to script at 'some/path/to/js/file' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, chrome-untrusted, https.*

## P. S.

აპლიკაცია არის *Mobile Friendly* და ადაპტირებულია ყველა ზომის *device*-ზე
