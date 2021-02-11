import React from 'react';
import {Grid,Form,Button} from "semantic-ui-react";
import PublishIcon from '@material-ui/icons/Publish';
import Card from 'react-bootstrap/Card';

function Add(){
    return(
        
        <Grid style={{height:'100%'}}>
        <Grid.Column width={3}></Grid.Column>
        <Grid.Column width={12} >
        <Card style={{ width: '50rem',height:'100%' }}>
          <Form size="large">
          <Button style={{marginBottom:'20px'}}fontSize="small"><PublishIcon/></Button>
                <div className="form-group">
                  <Form.Input type="text" id="title" name="title" placeholder="标题" required />
                </div>
                <div className="form-group">
                <Form.TextArea placeholder="请输入内容" style={{ minHeight: '30rem'} } rowsMin={30}/>
                </div>
                
                  
           <Button primary>发布</Button>
         
              </Form>
              </Card>
        </Grid.Column>
        </Grid>
    )
}

export default Add;