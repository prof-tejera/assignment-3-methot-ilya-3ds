import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";
import Background from "../components/generic/Background/Background";
import NeonButton from "../components/generic/Button/NeonButtons";
import FlexColumn from "../components/generic/FlexDivs/FlexColumn.js"
import FlexRow from "../components/generic/FlexDivs/FlexRow";
import Incrementer from "../components/generic/Incrementer/Incrementer";
import Input from "../components/generic/Input/Input";
import NeonParagraph from "../components/generic/Paragraph/NeonParagraph";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

class Documentation extends React.Component {
  render() {
    return (
      <Container>
        <div>
          <Title>Documentation</Title>
          <DocumentComponent
            title="NeonButton"
            component={<NeonButton>btn</NeonButton>}
            propDocs={[
              {
                prop: "onClick",
                description: "Method that runs when button is clicked",
                type: "func",
                defaultValue: "none",
              },
              {
                prop: "width",
                description: "Width of button",
                type: "string, number",
                defaultValue: "50, 50px",
              },
              {
                prop: "height",
                description: "Height of button",
                type: "string, number",
                defaultValue: "50, 50px",
              },
              {
                prop: "className",
                description: `Use to change the style of the Button. 
                Currently available options include: StartButton, ClearButton, PauseButton, RestartButton, display, smallButton`,
                type: "string",
                defaultValue: "StartButton",
              },
              {
                prop: "disabled",
                description: "Choose whether button is disabled (clickable)",
                type: "bool",
                defaultValue: "false",
              },
            ]}
          />
          <DocumentComponent
            title="Input"
            component={<Input/>}
            propDocs={[
              {
                prop: "width",
                description: "Width of Input",
                type: "string, number",
                defaultValue: "50, 50px",
              },
              {
                prop: "height",
                description: "Height of Input",
                type: "string, number",
                defaultValue: "50, 50px",
              },
              {
                prop: "disabled",
                description: "Choose whether button is disabled (clickable)",
                type: "bool",
                defaultValue: "false",
              },
            ]}
          />
          <DocumentComponent
            title="FlexColumn"
            component={<FlexColumn><NeonButton>btn</NeonButton><NeonButton className="RestartButton">btn</NeonButton><NeonButton className="ClearButton">btn</NeonButton></FlexColumn>}
            propDocs={[
              {
                prop: "color",
                description: "Changes the color of the background",
                type: "string",
                defaultValue: "white",
              },
              {
                prop: "width",
                description: "Width of div",
                type: "string, number",
                defaultValue: "auto",
              },
              {
                prop: "height",
                description: "Height of div",
                type: "string, number",
                defaultValue: "auto",
              },
              {
                prop: "margin",
                description: "Margin of div",
                type: "string, number",
                defaultValue: "0px",
              },
              {
                prop: "padding",
                description: "padding of div",
                type: "string, number",
                defaultValue: "10px",
              },
              {
                prop: "spaceEvenly",
                description: "determines whether to space child content evenly. If 'false', center the content",
                type: "string",
                defaultValue: "false",
              },
            ]}
          />
          <DocumentComponent
            title="FlexRow"
            component={<FlexRow><NeonButton>btn</NeonButton><NeonButton className="RestartButton">btn</NeonButton><NeonButton className="ClearButton">btn</NeonButton></FlexRow>}
            propDocs={[
              {
                prop: "color",
                description: "Changes the color of the background",
                type: "string",
                defaultValue: "white",
              },
              {
                prop: "width",
                description: "Width of div",
                type: "string, number",
                defaultValue: "auto",
              },
              {
                prop: "height",
                description: "Height of div",
                type: "string, number",
                defaultValue: "auto",
              },
              {
                prop: "margin",
                description: "Margin of div",
                type: "string, number",
                defaultValue: "0px",
              },
              {
                prop: "padding",
                description: "padding of div",
                type: "string, number",
                defaultValue: "10px",
              },
              {
                prop: "spaceEvenly",
                description: "determines whether to space child content evenly. If 'false', center the content",
                type: "string",
                defaultValue: "false",
              },
            ]}
          />
           <DocumentComponent
            title="NeonParagraph"
            component={<NeonParagraph>Neon Text</NeonParagraph>}
            propDocs={[
              {
                prop: "color",
                description: "Changes the color of the text",
                type: "string",
                defaultValue: "Blue",
              },
              {
                prop: "width",
                description: "Width of text container",
                type: "string, number",
                defaultValue: "auto",
              },
              {
                prop: "height",
                description: "Height of text container",
                type: "string, number",
                defaultValue: "auto",
              },
              {
                prop: "size",
                description: "Size of text",
                type: "string, number",
                defaultValue: "24px",
              },
              {
                prop: "padding",
                description: "padding of text container",
                type: "string, number",
                defaultValue: "10px",
              },
            ]}
          />
          <DocumentComponent
            title="Incrementer"
            component={<Incrementer/>}
            propDocs={[
              {
                prop: "max",
                description: "Max number the counter will increase to",
                type: "number",
                defaultValue: "10",
              },
              {
                prop: "max",
                description: "Min number the counter will decrease to",
                type: "number",
                defaultValue: "0",
              },
              {
                prop: "addZeros",
                description: "Display will always display this many numbers (example: setting addZeros to 2 will make 5 display as 05)",
                type: "number",
                defaultValue: "0",
              },
              {
                prop: "scale",
                description: "Character that appears besides number indicator display a scale (min, m, sec, s)",
                type: "string",
                defaultValue: "",
              },
              {
                prop: "width",
                description: "Width of object",
                type: "string, number",
                defaultValue: "auto",
              },
              {
                prop: "height",
                description: "Height of object",
                type: "string, number",
                defaultValue: "auto",
              },
              {
                prop: "padding",
                description: "padding of object",
                type: "string, number",
                defaultValue: "10px",
              },
              {
                prop: "margin",
                description: "Margin of object",
                type: "string, number",
                defaultValue: "0px",
              },
            ]}
          />
          <DocumentComponent
            title="Background"
            component={<Background/>}
            propDocs={[
              {
                prop: "width",
                description: "Width of object",
                type: "string, number",
                defaultValue: "300",
              },
              {
                prop: "height",
                description: "Height of object",
                type: "string, number",
                defaultValue: "400",
              },
              {
                prop: "padding",
                description: "padding of object",
                type: "string, number",
                defaultValue: "10px",
              }
            ]}
          />
        </div>
        
      </Container>
    );
  }
}

export default Documentation;
