export default {
    data() {
    return {
      powerlist: []
    }
  },
  methods:{
     async getpowerlist(){
        let res= await this.$http.get('/rights/list')
        const{data,meta}=res.data;
        if(meta.status===200){
            this.powerlist=data;
        }
      }
  },
  created(){
      this.getpowerlist();
  }
  
}