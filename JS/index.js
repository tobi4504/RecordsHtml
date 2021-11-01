//const baseUrl = ""
const baseUrl = "http://localhost:8595/Records";

Vue.createApp({
    data() {
        return {
            Records: [],
            vendorToGetBy: "",
            artistGetBy: "",
            sortCriteria: "",
            idToGetBy: -1,
            singleRecord: null,
            deleteId: 0,
            deleteMessage: "",
            addData: { title: "", artis: "", duration: 0 ,year: 0},
            addMessage: "",
            updateData: { id: 0, title: "", artis: "", duration: 0 ,year: 0 },
            updateMessage: ""
        }
    },
    methods: {
        getAllRecords(artistGetBy,sortCriteria) {
            if (artistGetBy != "" && sortCriteria != ""){
                const url = baseUrl + "?title=" + artistGetBy + "&sort_by=" + sortCriteria
                this.helperGetAndShow(url)

            }
            else if(artistGetBy != ""){
                const url = baseUrl + "?title=" + artistGetBy 
                this.helperGetAndShow(url)
            }
            else if(sortCriteria != ""){
                const url = baseUrl + "?sort_by=" + sortCriteria 

                this.helperGetAndShow(url)
            }
            else {
                this.helperGetAndShow(baseUrl) 
            }
          
        },
        getByVendor(vendor) {
            const url = baseUrl + "?vendor=" + vendor
            this.helperGetAndShow(url)
        },
        async helperGetAndShow(url) { // helper metode: getAllRecord + getByVendor are very similar
            try {
                const response = await axios.get(url)
                this.Records = await response.data
                console.log(this.Records)
            } catch (ex) {
                alert(ex.message) // https://www.w3schools.com/js/js_popup.asp
            }
        },
        async getById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleRecord = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteRecord(deleteId) {
            const url = baseUrl + "/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllRecords()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addRecord() {
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllRecords()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async updateRecord() {
            const url = baseUrl + "/" + this.updateData.id
            try {
                response = await axios.put(url, this.updateData)
                this.updateMessage = "response " + response.status + " " + response.statusText
                this.getAllRecords()
            } catch (ex) {
                alert(ex.message)
            }
        }
    }
}).mount("#app")