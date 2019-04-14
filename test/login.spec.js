import { shallow } from '@vue/test-utils'
import LoginForm from '../src/components/modal/LoginForm.js'

describe("LoginForm.vue", ()=>{
    it('test login form', () => {
        const wrapper = shallow(LoginForm)
        const message = wrapper.find('p').text();
        expect(message).toBe("abc");
    })
})