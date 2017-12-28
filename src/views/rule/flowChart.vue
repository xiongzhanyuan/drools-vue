<template>
    <div id="sample">
  <div style="width:100%; white-space:nowrap;">
    <span style="display: inline-block; vertical-align: top; width:100px">
      <div id="myPaletteDiv" style="border: solid 1px black; height: 720px"></div>
    </span>

    <span style="display: inline-block; vertical-align: top; width:80%">
      <div name = "myDiagramDiv" id="myDiagramDiv" style="border: solid 1px black; height: 720px"></div>
    </span>
  </div>
  <button id="SaveButton" @click="save()">Save</button>
  <button @click="load()">Load</button>
  <textarea id="mySavedModel" style="width:100%;height:300px">{ "class": "go.GraphLinksModel",
  "linkFromPortIdProperty": "fromPort",
  "linkToPortIdProperty": "toPort",
  "nodeDataArray": [ 
{"category":"Start", "text":"Start", "key":-1, "loc":"-377.4375 -247"},
{"text":"age<10", "figure":"Diamond", "key":-3, "loc":"-377.4375 -98"},
{"text":"拒件", "key":-2, "loc":"-378.4375 107"},
{"category":"End", "text":"End", "key":-4, "loc":"-378.4375 237"},
{"text":"scord >90", "figure":"Diamond", "key":-6, "loc":"-603.4375 -6"},
{"text":"通过", "key":-7, "loc":"-603.4375 145"}
 ],
  "linkDataArray": [ 
{"from":-1, "to":-3, "fromPort":"B", "toPort":"T", "points":[-377.4375,-222.22665990785111,-377.4375,-212.22665990785111,-377.4375,-176.3010542581248,-377.4375,-176.3010542581248,-377.4375,-140.37544860839844,-377.4375,-130.37544860839844]},
{"from":-3, "to":-2, "fromPort":"B", "toPort":"T", "visible":true, "points":[-377.4375,-65.62455139160157,-377.4375,-55.62455139160157,-377.4375,12.468862152099604,-378.4375,12.468862152099604,-378.4375,80.56227569580078,-378.4375,90.56227569580078]},
{"from":-2, "to":-4, "fromPort":"B", "toPort":"T", "points":[-378.4375,123.43772430419921,-378.4375,133.4377243041992,-378.4375,169.90785871106524,-378.4375,169.90785871106524,-378.4375,206.37799311793128,-378.4375,216.37799311793128]},
{"from":-3, "to":-6, "fromPort":"L", "toPort":"T", "visible":true, "points":[-444.0663299560547,-98,-454.0663299560547,-98,-603.4375,-98,-603.4375,-73.18772430419922,-603.4375,-48.375448608398436,-603.4375,-38.375448608398436], "text":"No"},
{"from":-6, "to":-2, "fromPort":"R", "toPort":"L", "visible":true, "points":[-518.07568359375,-6,-508.07568359375,-6,-459.83658599853516,-6,-459.83658599853516,107,-411.5974884033203,107,-401.5974884033203,107]},
{"from":-6, "to":-7, "fromPort":"B", "toPort":"T", "visible":true, "points":[-603.4375,26.375448608398436,-603.4375,36.375448608398436,-603.4375,77.46886215209962,-603.4375,77.46886215209962,-603.4375,118.56227569580079,-603.4375,128.5622756958008], "text":"No"},
{"from":-7, "to":-4, "fromPort":"R", "toPort":"T", "points":[-580.2775115966797,145,-570.2775115966797,145,-378.4375,145,-378.4375,175.68899655896564,-378.4375,206.37799311793128,-378.4375,216.37799311793128]}
 ]}
  </textarea>
</div>
            
</template>


<script>
import UploadAll from "@/views/common/uploadAll";
import gojs from "gojs";
import {
  reloadRule,
  selectConditionList,
  selectResultList,
  getRuleInfo
} from "@/api/rule";

var myDiagram;

export default {
  name: "hello",
  components: {
    gojs
  },
  data() {
    return {};
  },
  methods: {
    // Make all ports on a node visible when the mouse is over the node
    save() {

//       "linkDataArray": [ 
// {"from":-1, "to":-3, "fromPort":"B", "toPort":"T", "points":[-377.4375,-222.22665990785111,-377.4375,-212.22665990785111,-377.4375,-176.3010542581248,-377.4375,-176.3010542581248,-377.4375,-140.37544860839844,-377.4375,-130.37544860839844]},
// {"from":-3, "to":-2, "fromPort":"B", "toPort":"T", "visible":true, "points":[-377.4375,-65.62455139160157,-377.4375,-55.62455139160157,-377.4375,12.468862152099604,-378.4375,12.468862152099604,-378.4375,80.56227569580078,-378.4375,90.56227569580078]},
// {"from":-2, "to":-4, "fromPort":"B", "toPort":"T", "points":[-378.4375,123.43772430419921,-378.4375,133.4377243041992,-378.4375,169.90785871106524,-378.4375,169.90785871106524,-378.4375,206.37799311793128,-378.4375,216.37799311793128]},
// {"from":-3, "to":-6, "fromPort":"L", "toPort":"T", "visible":true, "points":[-444.0663299560547,-98,-454.0663299560547,-98,-603.4375,-98,-603.4375,-73.18772430419922,-603.4375,-48.375448608398436,-603.4375,-38.375448608398436], "text":"No"},
// {"from":-6, "to":-2, "fromPort":"R", "toPort":"L", "visible":true, "points":[-518.07568359375,-6,-508.07568359375,-6,-459.83658599853516,-6,-459.83658599853516,107,-411.5974884033203,107,-401.5974884033203,107]},
// {"from":-6, "to":-7, "fromPort":"B", "toPort":"T", "visible":true, "points":[-603.4375,26.375448608398436,-603.4375,36.375448608398436,-603.4375,77.46886215209962,-603.4375,77.46886215209962,-603.4375,118.56227569580079,-603.4375,128.5622756958008], "text":"No"},
// {"from":-7, "to":-4, "fromPort":"R", "toPort":"T", "points":[-580.2775115966797,145,-570.2775115966797,145,-378.4375,145,-378.4375,175.68899655896564,-378.4375,206.37799311793128,-378.4375,216.37799311793128]}
//  ]}

      document.getElementById("mySavedModel").value = myDiagram.model.toJson();
      myDiagram.isModified = false;

      debugger
      let dataArray = []
      dataArray = JSON.parse(myDiagram.model.toJson()).linkDataArray


      var array = new Array()
      dataArray.forEach(element => {
        if (array.length == 0) {
          array = [element.from, element.to]
        } else {
          


          dataArray.forEach(e => {
            if (array[array.length - 1] == e.from) {
              array.push(e.to)
              return false
            }
          })
        }
      })

      debugger




      // dataArray.forEach(element => {
      //   //[-1, -3]
      //   //[-1, -3, -2]
      //   //[-1, -3, -6]

      //   //[-1, -3, -2, -4]

      //   //[-1, -3, -6, -2]
      //   //[-1, -3, -6, -7]

      //   //[-1, -3, -6, -2, -4]
      //   //[-1, -3, -6, -7, -4]
      //     var array = new Array()
      //     array = [element.from, element.to];


      //     debugger
      // });

    },
    load() {
      debugger
      myDiagram.model = go.Model.fromJson(
      document.getElementById("mySavedModel").value
    );
    }
  },
  mounted() {
    function showPorts(node, show) {
      var diagram = node.diagram;
      if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
      node.ports.each(function(port) {
        port.stroke = show ? "white" : null;
      });
    }

    // Show the diagram's model in JSON format that the user may edit
    function save() {
      document.getElementById("mySavedModel").value = myDiagram.model.toJson();
      myDiagram.isModified = false;
    }

    // add an SVG rendering of the diagram at the end of this page
    function makeSVG() {
      var svg = myDiagram.makeSvg({
        scale: 0.5
      });
      svg.style.border = "1px solid black";
      obj = document.getElementById("SVGArea");
      obj.appendChild(svg);
      if (obj.children.length > 0) {
        obj.replaceChild(svg, obj.children[0]);
      }
    }
    if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make; // for conciseness in defining templates

    myDiagram = $(
      go.Diagram,
      "myDiagramDiv", // must name or refer to the DIV HTML element
      {
        initialContentAlignment: go.Spot.Center,
        allowDrop: true, // must be true to accept drops from the Palette
        LinkDrawn: showLinkLabel, // this DiagramEvent listener is defined below
        LinkRelinked: showLinkLabel,
        // scrollsPageOnFocus: false,
        "undoManager.isEnabled": true // enable undo & redo
      }
    );

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function(e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });

    // helper definitions for node templates

    function nodeStyle() {
      return [
        // The Node.location comes from the "loc" property of the node data,
        // converted by the Point.parse static method.
        // If the Node.location is changed, it updates the "loc" property of the node data,
        // converting back using the Point.stringify static method.
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        {
          // the Node.location is at the center of each node
          locationSpot: go.Spot.Center,
          //isShadowed: true,
          //shadowColor: "#888",
          // handle mouse enter/leave events to show/hide the ports
          mouseEnter: function(e, obj) {
            showPorts(obj.part, true);
          },
          mouseLeave: function(e, obj) {
            showPorts(obj.part, false);
          }
        }
      ];
    }

    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments
    // control whether the user can draw links from or to the port.
    function makePort(name, spot, output, input) {
      // the port is basically just a small circle that has a white stroke when it is made visible
      return $(go.Shape, "Circle", {
        fill: "transparent",
        stroke: null, // this is changed to "white" in the showPorts function
        desiredSize: new go.Size(8, 8),
        alignment: spot,
        alignmentFocus: spot, // align the port on the main Shape
        portId: name, // declare this object to be a "port"
        fromSpot: spot,
        toSpot: spot, // declare where links may connect at this port
        fromLinkable: output,
        toLinkable: input, // declare whether the user may draw links to/from here
        cursor: "pointer" // show a different cursor to indicate potential link point
      });
    }

    // define the Node templates for regular nodes

    var lightText = "whitesmoke";

    myDiagram.nodeTemplateMap.add(
      "", // the default category
      $(
        go.Node,
        "Spot",
        nodeStyle(),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        $(
          go.Panel,
          "Auto",
          $(
            go.Shape,
            "Rectangle",
            { fill: "#00A9C9", stroke: null },
            new go.Binding("figure", "figure")
          ),
          $(
            go.TextBlock,
            {
              font: "bold 11pt Helvetica, Arial, sans-serif",
              stroke: lightText,
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              editable: true
            },
            new go.Binding("text").makeTwoWay()
          )
        ),
        // four named ports, one on each side:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false)
      )
    );

    myDiagram.nodeTemplateMap.add(
      "Start",
      $(
        go.Node,
        "Spot",
        nodeStyle(),
        $(
          go.Panel,
          "Auto",
          $(go.Shape, "Circle", {
            minSize: new go.Size(40, 40),
            fill: "#79C900",
            stroke: null
          }),
          $(
            go.TextBlock,
            "Start",
            {
              font: "bold 11pt Helvetica, Arial, sans-serif",
              stroke: lightText
            },
            new go.Binding("text")
          )
        ),
        // three named ports, one on each side except the top, all output only:
        makePort("L", go.Spot.Left, true, false),
        makePort("R", go.Spot.Right, true, false),
        makePort("B", go.Spot.Bottom, true, false)
      )
    );

    myDiagram.nodeTemplateMap.add(
      "End",
      $(
        go.Node,
        "Spot",
        nodeStyle(),
        $(
          go.Panel,
          "Auto",
          $(go.Shape, "Circle", {
            minSize: new go.Size(40, 40),
            fill: "#DC3C00",
            stroke: null
          }),
          $(
            go.TextBlock,
            "End",
            {
              font: "bold 11pt Helvetica, Arial, sans-serif",
              stroke: lightText
            },
            new go.Binding("text")
          )
        ),
        // three named ports, one on each side except the bottom, all input only:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, false, true),
        makePort("R", go.Spot.Right, false, true)
      )
    );

    myDiagram.nodeTemplateMap.add(
      "Comment",
      $(
        go.Node,
        "Auto",
        nodeStyle(),
        $(go.Shape, "File", { fill: "#EFFAB4", stroke: null }),
        $(
          go.TextBlock,
          {
            margin: 5,
            maxSize: new go.Size(200, NaN),
            wrap: go.TextBlock.WrapFit,
            textAlign: "center",
            editable: true,
            font: "bold 12pt Helvetica, Arial, sans-serif",
            stroke: "#454545"
          },
          new go.Binding("text").makeTwoWay()
        )
        // no ports, because no links are allowed to connect with a comment
      )
    );

    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5,
        toShortLength: 4,
        relinkableFrom: true,
        relinkableTo: true,
        reshapable: true,
        resegmentable: true,
        // mouse-overs subtly highlight links:
        mouseEnter: function(e, link) {
          link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
        },
        mouseLeave: function(e, link) {
          link.findObject("HIGHLIGHT").stroke = "transparent";
        }
      },
      new go.Binding("points").makeTwoWay(),
      $(
        go.Shape, // the highlight shape, normally transparent
        {
          isPanelMain: true,
          strokeWidth: 8,
          stroke: "transparent",
          name: "HIGHLIGHT"
        }
      ),
      $(
        go.Shape, // the link path shape
        { isPanelMain: true, stroke: "gray", strokeWidth: 2 }
      ),
      $(
        go.Shape, // the arrowhead
        { toArrow: "standard", stroke: null, fill: "gray" }
      ),
      $(
        go.Panel,
        "Auto", // the link label, normally not visible
        {
          visible: false,
          name: "LABEL",
          segmentIndex: 2,
          segmentFraction: 0.5
        },
        new go.Binding("visible", "visible").makeTwoWay(),
        $(
          go.Shape,
          "RoundedRectangle", // the label shape
          { fill: "#F8F8F8", stroke: null }
        ),
        $(
          go.TextBlock,
          "Yes", // the label
          {
            textAlign: "center",
            font: "10pt helvetica, arial, sans-serif",
            stroke: "#333333",
            editable: true
          },
          new go.Binding("text").makeTwoWay()
        )
      )
    );

    // Make link labels visible if coming out of a "conditional" node.
    // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
    function showLinkLabel(e) {
      var label = e.subject.findObject("LABEL");
      if (label !== null)
        label.visible = e.subject.fromNode.data.figure === "Diamond";
    }

    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
    myDiagram.toolManager.linkingTool.temporaryLink.routing =
      go.Link.Orthogonal;
    myDiagram.toolManager.relinkingTool.temporaryLink.routing =
      go.Link.Orthogonal;

    // load();  // load an initial diagram from some JSON text
    // load() {
    myDiagram.model = go.Model.fromJson(
      document.getElementById("mySavedModel").value
    );
    // },

    // initialize the Palette that is on the left side of the page
    var myPalette = $(
      go.Palette,
      "myPaletteDiv", // must name or refer to the DIV HTML element
      {
        // scrollsPageOnFocus: false,
        nodeTemplateMap: myDiagram.nodeTemplateMap, // share the templates used by myDiagram
        model: new go.GraphLinksModel([
          // specify the contents of the Palette
          { category: "Start", text: "Start" },
          { text: "Step" },
          { text: "条件", figure: "Diamond" },
          { category: "End", text: "End" },
          { category: "Comment", text: "Comment" }
        ])
      }
    );
  } // end init
};
</script>




<style rel="stylesheet/scss" lang="scss" scoped>
.tmsDiv {
  width: 60%;
  margin: 40px;
  text-align: left;
}

.tmsAddDiv {
  margin-top: 10px;
  text-align: right;
}

.tmsDetailDiv {
  border: 1px dashed #d9d9d9;
  margin-top: 5px;
}

.tmsDetailDiv form {
  margin: 10px;
}

.sub-navbar {
  margin-top: 10px;
  /* text-align: right; */
  /* position: fixed; */
  right: 300px;
  top: 40px;
}
.list-group {
  /* width: 100px; */
  /* padding: 20px 0;
    max-width: 360px;
    margin-top: -8px;
    margin-left: 5px;
    background-color: #fff; */
  // height: auto;
  line-height: 30px;
}
.rule-class {
  // padding: 20px 0;
  // max-width: 360px;
  // background-color: #fff;
  // height: 100px;
  min-height: 100px;
  display: flow-root;
}
.component-list {
  background: #fff;
  list-style: none;
  width: 300px;
  line-height: 1.5;

  h3 {
    padding: 3px 10px;
    color: #fff;
    background: #ff7373;
    position: relative;
    top: -10px;
    left: -10px;
    width: 100px;
  }
  li {
    list-style: none;
  }
}

.condition-list {
  background: #fff;
  list-style: none;
  line-height: 1.5;
  margin-bottom: 30px;
  h3 {
    padding: 3px 10px;
    color: #fff;
    background: #ff7373;
    position: relative;
    top: -20px;
    left: -10px;
    width: 100px;
  }
  li {
    color: #fff;
    float: left;
    margin: 8px 20px 10px 0;
    padding: 5px 10px;
    min-width: 10px;
    background-color: #5f9edf;
    text-align: center;
  }
  .mrd-check:after {
    content: "\2715";
    position: absolute;
    top: -10px;
    left: 95px;
    color: #5f9edf;
    text-align: center;
    font-size: 0.6em;
    padding: 1px 0 0 0;
    vertical-align: text-top;
  }
}
</style>