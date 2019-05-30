<template>
    <v-card
        class="mb-5"
        color="grey lighten-3"
    >
        <v-btn absolute dark fab top right class="crimson"
        @click="deleteData">
            <v-icon>remove</v-icon>
        </v-btn>

        <v-container>
            <v-text-field
                label="질문을 입력하세요"
                single-line	                
                color="cyan ligten-1"	
                class="surveyQuestion"
            />
            <div v-if="type === 1">
                <div v-for="i in samplestype1" :key="i">
                    <v-layout>
                    <v-text-field 
                        class="type1"
                        prepend-icon="mdi-checkbox-blank-circle-outline"
                        label="보기를 입력하세요"
                        single-line
                        color="rgb(111, 111, 111)"
                    />
                    <v-spacer/>
                    <v-icon
                    >mdi-close</v-icon>
                    </v-layout>
                </div>
                <v-layout 
                    v-if="type === 1"
                    @click="addType1(n)"
                >
                    <v-icon>mdi-plus</v-icon>
                    <v-input
                    label="보기 추가"
                    class="addSample"
                    />
                </v-layout>
            </div>
            <div  v-if="type === 2">
                <template class="type2" v-for="j in samplestype2">
                    <v-layout :key="1000+j">
                    <v-text-field 
                        class="type2"
                        prepend-icon="mdi-checkbox-blank-outline"
                        label="보기를 입력하세요"
                        single-line
                        color="rgb(111, 111, 111)"
                    />
                    <v-spacer />
                        <v-icon
                        >mdi-close</v-icon>  
                    </v-layout>
                </template>
                <v-layout v-if="type === 2">
                    <v-icon>mdi-plus</v-icon>
                    <v-input
                    label="보기 추가"
                    class="addSample"
                    ></v-input>               
                </v-layout> 
            </div>

            <v-layout v-if="type === 3">
                <v-textarea
                    disabled
                    solo
                    flat
                    outline 
                    color="cyan lighten-1"
                ></v-textarea>
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>
export default {
    data() {
        return {
            type:this.card_data.type,
            samplestype1:this.card_data.samplestype1,
            samplestype2:this.card_data.samplestype1,
        }
    },
    props:{
        card_data:Object
    },
    methods: {
        deleteData(){
            this.$emit("remove");
        },
        // addType1(n) {
        //     this.samplestype1[n-1].push(1)
        // },
        // addType2(n) {
        //     this.samplestype2[n-1].push(1)
        // },
        // deleteType1(i) {
        //     this.samplestype1 = this.samplestype1 - 1
        // },
        // deleteType2(j) {
        //     this.samplestype2 = this.samplestype2 - 1
        // }
    },
}
</script>
