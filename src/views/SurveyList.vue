 <template>
    <v-expansion-panel-content>
        <template v-slot:actions>
            <v-icon color="cyan ligten-1">$vuetify.icons.expand</v-icon>
        </template>
        <template v-slot:header>
            <div>{{survey.surveyName}}</div>
            <div>{{survey.date}}</div>
            <v-btn 
                v-if="!survey.active"
                class="green accent-4 white--text surveyStart"
                @click.stop="surveyActive()"
            >
                설문 시작
            </v-btn>
            <v-btn 
                v-else
                class="red darken-4 white--text surveyEnd"
                @click.stop="surveyActive()"
            >
                설문 종료
            </v-btn>
        </template>
        <v-stepper v-model="e1">
            <v-stepper-header>
                <template class="step" v-for="n in steps">
                    <v-stepper-step
                        :key="`${n}-step`"
                        :complete="e1 > n"
                        :step="n"
                        editable
                        color="cyan lighten-1"
                    >
                        문항 {{ n }}
                    </v-stepper-step>
                    <v-divider v-if="n !== steps" :key="n"/>
                </template>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
                    <v-card
                        class="mb-5"
                        color="grey lighten-3"
                    >
                        <v-container fluid>
                            {{survey.surveyList[n-1].surveyQuestion}}
                            <v-radio-group 
                                v-show="survey.surveyList[n-1].surveyType == 1"  
                                column
                                v-for="c in survey.surveyList[n-1].content.length" 
                                :key="`${c}-radio`"
                            >
                                <v-radio disabled :id="`${c}`" :label="`${survey.surveyList[n-1].content[c-1]}`" color="cyan ligten-1" />
                            </v-radio-group>
                            <div
                                v-show="survey.surveyList[n-1].surveyType==2"
                                v-for="c in survey.surveyList[n-1].content.length"
                                :key="`${c}-checkbox`"
                            >
                                <v-checkbox disabled :id="`${c}`" :label="`${survey.surveyList[n-1].content[c-1]}`" color="cyan ligten-1" />
                            </div>
                        </v-container>
                    </v-card>
                    <v-layout justify-space-between>
                        <v-btn 
                            class="cyan lighten-1 white--text"
                            @click="preStep(n)"
                        >
                        Pre
                        </v-btn>

                        <v-btn
                            class="cyan lighten-1 white--text"
                            @click="nextStep(n)"
                        >
                        Next
                        </v-btn>
                    </v-layout>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-expansion-panel-content>
    
</template>
<script>
import { Prof } from "@/api";
/*eslint-disable */
export default {
    data(){
        return {
            steps:this.survey.surveyList.length,
            e1:1
        }
    },
    props:{
        survey:Object,
    },
    methods:{
        nextStep (n) {
            this.e1 = n + 1
        },
        preStep (n) {
            if (1 === this.steps) {
                this.e1 = 1
            } else {
                this.e1 = n - 1
            }
        },
        surveyActive(){
            Prof.surveyActive(this.survey)
            .then(res =>{
                console.log(res);
                this.survey.active = res.data        
            })
        }
    }
}
</script>
<style>
.classStat{
  width:120px !important;
}
.v-expansion-panel__header{
  display: -webkit-box;
}
.surveyStart{
  margin-right:5px !important;
}
.surveyEnd{
  margin-right:5px !important;
}
.surveyStart:hover{
  background: #00E676;
}
</style>
