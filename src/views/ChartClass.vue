<template>
  <v-layout row wrap fill-height>
    <v-flex xs6 sm2 md12 lg12 xl12>
        <div id="chat-container">
            
            <div id="chat-title">
                <span> 질문 클래스</span>
                
            </div>
            <div id="chat-message-list">
                <div 
                  class="message-row other-message"
                  v-for="(ques, i) in  questionList"
                  :key="i"
                >
                    <div class="message-text">{{ques.question}}</div>
                    <div class="message-time">{{ques.date}}</div>
                </div>
            </div>
            <div id="chat-form">
                <img/>
                <input v-on:keyup.enter="test()" v-model="question" type="text" placeholder="type a message" />
            </div>





            <div id="new-message-container">
                <a herf="#">+</a>
            </div>

            <div id="search-container">
                <input type="text" placeholder="클래스 접속자"/>
            </div>
            <div id="conversation-list" >
                <div 
                  class="conversation"
                  v-for="(user, i) in userList"
                  :key="i"
                >
                    <img 
                    :src="require(`@/assets/${user.image}.png`)"
                    height=100%
                    />
                    <div class="title-text">
                        {{user.userName}}
                    </div>
                    <div class="created-date">
                        {{user.value}}
                    </div>
                    <!-- <div class="conversation-message">
                        {{user.userName}}
                    </div> -->
                </div>
            </div>

        </div>
      </v-flex>
  </v-layout>
</template>

<script>
import {Stud} from "@/api";
export default {
    created(){
      Stud.loadQuestion(this.$store.state.currentClass.classCode).then(res => {
        if(res.data === 'false') alert('질문 가져오기 실패');
        else{
          this.questionList = res.data.questionList;
          alert(res.data.questionList);
        }   
      })
    },
    data(){
    return{
      question:'',
      questionList: [],
      userList: [{userName:'윤대균', value:'교수', image:'professor'},{userName:'임총배', value:'학생', image:'student'}]
    }
  },
  
  methods:{
    type(){
      this.questionList.push({question: this.question, date: new Date()});
      this.question='';
    },
    test(e){
      
      this.$socket.emit('chat', {
        classCode:this.$store.state.currentClass.classCode,
        userID:this.$store.state.userID,
        userName:this.$store.state.userName,
        _question:this.question,
        anonymous:false
      })
    }
  }
}
</script>

<style>
#chat-container {
    display: grid;
    grid:
        'search-container chat-title' 71px
        'conversation-list chat-message-list' 1fr
        'new-message-container chat-form' 78px
        / 275px 1fr;
    min-width: 800px;

    max-height: 800px;
    height: 95vh;
    background: #FFF;
    border-radius: 10px;
}
#search-container,
#conversation-list,
#new-message-container {
    background: darkcyan;
}

#search-container {
    display: grid;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    grid-area: search-container;
    border-radius: 10px 0 0 0;
    box-shadow: 0 1px 3px -1px rgba(0,0,0,0.75);
    z-index: 1;
}

#search-container input{
    color: #eee;
    outline: none;
    font-weight: bold;
    border-radius: 2px;
    height: 30px;
    border: 0;
    padding-left: 48px;
    padding-right: 20px;
    font-size: 1.4rem;
    background-position: 15px center;
    background-size: 20px 20px;
}

#search-container input::placeholder {
    color: #ddd;
    font-weight: bold;
}

#conversation-list {
    grid-area: conversation-list;
    overflow-y: scroll;
}

.conversation {
    display: grid;
    grid-template-columns: 40px 1fr max-content;
    color: #ddd;
    grid-gap: 10px;
    font-size: 1.3rem;
    border-bottom: 1px solid #ddd;
    padding: 20px 20px 20px 15px;
}

.conversation.active,
.conversation:hover {
    background: #002C88;
}
.conversation:hover {
    cursor: pointer;
}

.conversation > img {
    grid-row: span 2;
    height: 40px;
    width: 40px;
    border-radius: 100%;
}

.title-text {
    font-weight: bold;
    color: #eee;
    padding-left: 5px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

.created-date {
    color: #ddd;
    font-size: 1rem;
}

.conversation-message {
    grid-column: span 2;
    padding-left: 5px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
}

#new-message-container {
    display: grid;
    grid: 40px / 40px;
    align-content: center;
    grid-area: new-message-container;
    border-top: 1px solid black;
    border-radius: 0 0 0 10px;
    padding: 0 15px;
}

#new-message-container a {
    display: grid;
    place-content: center center;
    background: #eee;
    border-radius: 100%;
    color: #002C88;
    text-decoration: none;
    font-size: 3.6rem;
}

#chat-title,
#chat-form {
    display:grid;
    grid: 51px /32px 1fr;
    grid-area: chat-form;
    align-content: center;
    align-items: center;
    grid-gap: 15px;
    border-radius: 0 0 10px 0;
    border-top: 1px solid rgba(0,0,0,0.25);
    padding-left: 42px;
    padding-right: 22px;
}

#chat-form input {
    outline: none;
    padding: 15px;
    border: 2px solid #ddd;
    color: #330;
    border-radius: 6px;
    font-size: 1.4rem;
}

#chat-title {
    display: grid;
    grid: 36px /1fr 36px;
    align-content: center;
    align-items: center;
    grid-area: chat-title;
    color: darkcyan;
    font-weight: bold;
    font-size: 2.0rem;
    border-radius: 0 10px 0 0;
    box-shadow: 0 1px 3px -1px black;
    padding: 0 20px;
}

#chat-title > img {
    cursor: pointer;
}

#chat-message-list {
    grid-area: chat-message-list;
    display:flex;
    flex-direction:  column-reverse;
    padding: 0 20px;
    margin-top: 3px;
    overflow-y: scroll;
}

.message-row {
    display: grid;
    grid-template-columns: 70%;
    margin-bottom: 20px;
}

.message-content {
    display: grid;
}

.you-message {
    justify-content: end;
    justify-items: end;
}
.you-message .message-content {
    justify-items: end;
}

.other-message {
    justify-items: start;
}

.other-message .message-content {
    grid-template-columns: 48px 1fr;
    grid-column-gap: 15px;
}

.message-row img {
    border-radius: 100%;
    grid-row: span 2;
}

.message-text {
    padding: 9px 14px;
    font-size: 1.6rem;
    margin-bottom: 5px;
}

.message-time {
    font-size: 1.3rem;
    color: #777;
}

.you-message .message-text {
    background: #0048AA;
    color: #eee;
    border: 1px solid #0048AA;
    border-radius: 14px 14px 0 14px;
}

.other-message .message-text {
    background: #eee;
    color: #111;
    border: 1px solid #ddd;
}

#chat-from {
    display: grid;
    grid: 51px / 32px 1fr;
    align-content: center;
    align-items: center;
    grid-gap: 15px;
    grid-area: chat-form;
    border-radius: 0 0 10px 0;
    border-top: 1px solid rgba(0,0,0,0.25);
    padding-left: 42px;
    padding-right: 22px;
}

#chat-form input {
    outline: none;
    padding: 15px;
    border: 2px solid #ddd;
    color: #330;
    border-radius: 6px;
    font-size: 1.4rem;
}

::-webkit-scrollbar {
    display: none;
}
</style>
